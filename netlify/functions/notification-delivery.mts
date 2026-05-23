import type { Config } from "@netlify/functions";
import {
  createCipheriv,
  createECDH,
  createHmac,
  createPrivateKey,
  createSign,
  randomBytes,
} from "node:crypto";

const SUPABASE_URL = Netlify.env.get("SUPABASE_URL") || Netlify.env.get("VITE_SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const DELIVERY_DRY_RUN = Netlify.env.get("NOTIFICATION_DELIVERY_DRY_RUN") !== "false";
const RESEND_API_KEY = Netlify.env.get("RESEND_API_KEY") || "";
const EMAIL_FROM = Netlify.env.get("NOTIFICATION_EMAIL_FROM") || "";
const WEB_PUSH_ENDPOINT = Netlify.env.get("WEB_PUSH_ENDPOINT") || "";
const WEB_PUSH_TOKEN = Netlify.env.get("WEB_PUSH_TOKEN") || "";
const WEB_PUSH_VAPID_SUBJECT = Netlify.env.get("WEB_PUSH_VAPID_SUBJECT") || "";
const WEB_PUSH_VAPID_PUBLIC_KEY = Netlify.env.get("WEB_PUSH_VAPID_PUBLIC_KEY") || "";
const WEB_PUSH_VAPID_PRIVATE_KEY = Netlify.env.get("WEB_PUSH_VAPID_PRIVATE_KEY") || "";
const WEB_PUSH_TTL_SECONDS = Number(Netlify.env.get("WEB_PUSH_TTL_SECONDS") || 60 * 60 * 24);

type Delivery = {
  id: string;
  owner_id: string;
  task_key: string;
  label: string;
  channel: "push" | "email";
  scheduled_for: string;
  attempt_count: number;
  profiles?: {
    email?: string | null;
    notification_channel?: string | null;
    email_notifications_enabled?: boolean | null;
  } | null;
};

type PushSubscriptionRecord = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

type PushSendResult = {
  sent: number;
  expired: number;
  failed: number;
};

type DeliveryResult = {
  id: string;
  status: "sent" | "failed" | "skipped";
  reason?: string;
};

export default async () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse({ error: "Missing Supabase service configuration" }, 500);
  }

  const dueDeliveries = await listDueDeliveries();
  if (DELIVERY_DRY_RUN) {
    return jsonResponse({
      dryRun: true,
      dueCount: dueDeliveries.length,
      deliveryIds: dueDeliveries.map((delivery) => delivery.id),
    });
  }

  const results: DeliveryResult[] = [];
  for (const delivery of dueDeliveries) {
    try {
      results.push(await processDelivery(delivery));
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown delivery error";
      await updateDelivery(delivery, "failed", reason);
      results.push({ id: delivery.id, status: "failed", reason });
    }
  }

  return jsonResponse({
    dryRun: false,
    processed: results.length,
    results,
  });
};

export const config: Config = {
  schedule: "*/15 * * * *",
};

async function listDueDeliveries(): Promise<Delivery[]> {
  const now = new Date().toISOString();
  const url = new URL(`${SUPABASE_URL}/rest/v1/notification_deliveries`);
  url.searchParams.set("select", "id,owner_id,task_key,label,channel,scheduled_for,attempt_count,profiles(email,notification_channel,email_notifications_enabled)");
  url.searchParams.set("status", "eq.pending");
  url.searchParams.set("scheduled_for", `lte.${now}`);
  url.searchParams.set("order", "scheduled_for.asc");
  url.searchParams.set("limit", "25");

  const response = await fetch(url, {
    headers: supabaseHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to list due deliveries: ${response.status} ${await response.text()}`);
  }

  return response.json() as Promise<Delivery[]>;
}

async function processDelivery(delivery: Delivery): Promise<DeliveryResult> {
  const profile = delivery.profiles;
  if (!profile || profile.notification_channel === "none") {
    await updateDelivery(delivery, "skipped", "Notifications disabled");
    return { id: delivery.id, status: "skipped", reason: "Notifications disabled" };
  }

  if (delivery.channel === "email") {
    const email = profile.email;
    if (!profile.email_notifications_enabled || !email) {
      await updateDelivery(delivery, "skipped", "Email notifications disabled or missing recipient");
      return { id: delivery.id, status: "skipped", reason: "Email notifications disabled or missing recipient" };
    }

    if (!RESEND_API_KEY || !EMAIL_FROM) {
      await updateDelivery(delivery, "failed", "Email provider is not configured");
      return { id: delivery.id, status: "failed", reason: "Email provider is not configured" };
    }

    await sendEmail(email, delivery);
    await updateDelivery(delivery, "sent");
    return { id: delivery.id, status: "sent" };
  }

  const pushSubscriptions = await listPushSubscriptions(delivery.owner_id);
  if (!pushSubscriptions.length) {
    await updateDelivery(delivery, "skipped", "No active push subscription");
    return { id: delivery.id, status: "skipped", reason: "No active push subscription" };
  }

  if (!canSendDirectWebPush() && (!WEB_PUSH_ENDPOINT || !WEB_PUSH_TOKEN)) {
    await updateDelivery(delivery, "failed", "Push provider is not configured");
    return { id: delivery.id, status: "failed", reason: "Push provider is not configured" };
  }

  const pushResult = await sendPush(pushSubscriptions, delivery);
  if (pushResult.sent === 0 && pushResult.expired > 0 && pushResult.failed === 0) {
    await updateDelivery(delivery, "skipped", "All push subscriptions expired");
    return { id: delivery.id, status: "skipped", reason: "All push subscriptions expired" };
  }

  if (pushResult.sent === 0 && pushResult.failed > 0) {
    throw new Error("All active push subscription sends failed");
  }

  await updateDelivery(delivery, "sent");
  return { id: delivery.id, status: "sent" };
}

async function sendEmail(to: string, delivery: Delivery) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject: `AquaNote: ${delivery.label}の時間です`,
      text: `${delivery.label}の予定時刻になりました。AquaNoteで今日の管理タスクを確認しましょう。`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email send failed: ${response.status} ${await response.text()}`);
  }
}

async function listPushSubscriptions(ownerId: string): Promise<PushSubscriptionRecord[]> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/push_subscriptions`);
  url.searchParams.set("select", "id,endpoint,p256dh,auth");
  url.searchParams.set("owner_id", `eq.${ownerId}`);
  url.searchParams.set("enabled", "eq.true");

  const response = await fetch(url, {
    headers: supabaseHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to list push subscriptions: ${response.status} ${await response.text()}`);
  }

  return response.json() as Promise<PushSubscriptionRecord[]>;
}

async function sendPush(subscriptions: PushSubscriptionRecord[], delivery: Delivery): Promise<PushSendResult> {
  if (canSendDirectWebPush()) {
    return sendDirectWebPush(subscriptions, delivery);
  }

  const response = await fetch(WEB_PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WEB_PUSH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscriptions,
      notification: {
        title: "AquaNote",
        body: `${delivery.label}の時間です。今日の管理タスクを確認しましょう。`,
        tag: `aquanote-${delivery.task_key}`,
        url: "/#dashboard",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Push send failed: ${response.status} ${await response.text()}`);
  }

  return {
    sent: subscriptions.length,
    expired: 0,
    failed: 0,
  };
}

async function sendDirectWebPush(
  subscriptions: PushSubscriptionRecord[],
  delivery: Delivery,
): Promise<PushSendResult> {
  const notification = JSON.stringify({
    title: "AquaNote",
    body: `${delivery.label}の時間です。今日の管理タスクを確認しましょう。`,
    tag: `aquanote-${delivery.task_key}`,
    url: "/#dashboard",
  });

  const results = await Promise.allSettled(
    subscriptions.map((subscription) => sendWebPushNotification(subscription, notification)),
  );
  const sent = results.filter((result) => result.status === "fulfilled" && result.value === "sent").length;
  const expiredSubscriptions = subscriptions.filter((_, index) => {
    const result = results[index];
    return result.status === "fulfilled" && result.value === "expired";
  });
  const failures = results.filter((result) => result.status === "rejected");

  await Promise.all(expiredSubscriptions.map((subscription) => disablePushSubscription(subscription)));

  if (sent === 0 && failures.length === results.length) {
    const reason = failures[0]?.status === "rejected" ? failures[0].reason : "Unknown push error";
    throw new Error(`All Web Push sends failed: ${reason instanceof Error ? reason.message : String(reason)}`);
  }

  return {
    sent,
    expired: expiredSubscriptions.length,
    failed: failures.length,
  };
}

async function sendWebPushNotification(subscription: PushSubscriptionRecord, payload: string) {
  const encrypted = encryptWebPushPayload(subscription, payload);
  const response = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      Authorization: getVapidAuthorization(subscription.endpoint),
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: String(WEB_PUSH_TTL_SECONDS),
      Urgency: "normal",
    },
    body: encrypted,
  });

  if (response.status === 404 || response.status === 410) {
    return "expired" as const;
  }

  if (!response.ok) {
    throw new Error(`Web Push send failed: ${response.status} ${await response.text()}`);
  }

  return "sent" as const;
}

async function disablePushSubscription(subscription: PushSubscriptionRecord) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/push_subscriptions`);
  url.searchParams.set("id", `eq.${subscription.id}`);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...supabaseHeaders(),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      enabled: false,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to disable expired push subscription: ${response.status} ${await response.text()}`);
  }
}

function encryptWebPushPayload(subscription: PushSubscriptionRecord, payload: string) {
  const salt = randomBytes(16);
  const receiverPublicKey = base64UrlToBuffer(subscription.p256dh);
  const authSecret = base64UrlToBuffer(subscription.auth);
  const sender = createECDH("prime256v1");
  sender.generateKeys();
  const senderPublicKey = sender.getPublicKey();
  const sharedSecret = sender.computeSecret(receiverPublicKey);
  const ikm = hkdf(authSecret, sharedSecret, webPushInfo(receiverPublicKey, senderPublicKey), 32);
  const contentEncryptionKey = hkdf(salt, ikm, Buffer.from("Content-Encoding: aes128gcm\0"), 16);
  const nonce = hkdf(salt, ikm, Buffer.from("Content-Encoding: nonce\0"), 12);
  const plaintext = Buffer.concat([Buffer.from(payload), Buffer.from([0x02])]);
  const cipher = createCipheriv("aes-128-gcm", contentEncryptionKey, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const recordSize = Buffer.alloc(4);
  recordSize.writeUInt32BE(4096, 0);

  return Buffer.concat([
    salt,
    recordSize,
    Buffer.from([senderPublicKey.length]),
    senderPublicKey,
    ciphertext,
  ]);
}

function getVapidAuthorization(endpoint: string) {
  const claims = {
    aud: new URL(endpoint).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    sub: WEB_PUSH_VAPID_SUBJECT,
  };
  const header = base64UrlEncode(Buffer.from(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const body = base64UrlEncode(Buffer.from(JSON.stringify(claims)));
  const signature = signEs256(`${header}.${body}`);

  return `vapid t=${header}.${body}.${signature}, k=${WEB_PUSH_VAPID_PUBLIC_KEY}`;
}

function signEs256(value: string) {
  const publicKey = base64UrlToBuffer(WEB_PUSH_VAPID_PUBLIC_KEY);
  const privateKey = createPrivateKey({
    key: {
      kty: "EC",
      crv: "P-256",
      x: base64UrlEncode(publicKey.subarray(1, 33)),
      y: base64UrlEncode(publicKey.subarray(33, 65)),
      d: WEB_PUSH_VAPID_PRIVATE_KEY,
    },
    format: "jwk",
  });
  const signer = createSign("SHA256");
  signer.update(value);
  signer.end();
  const derSignature = signer.sign(privateKey);
  return base64UrlEncode(derToJoseSignature(derSignature));
}

function derToJoseSignature(signature: Buffer) {
  let offset = 3;
  let rLength = signature[offset - 1];
  if (rLength > 32) {
    offset += rLength - 32;
    rLength = 32;
  }
  const r = signature.subarray(offset, offset + rLength);
  offset += rLength + 2;
  let sLength = signature[offset - 1];
  if (sLength > 32) {
    offset += sLength - 32;
    sLength = 32;
  }
  const s = signature.subarray(offset, offset + sLength);

  return Buffer.concat([leftPad(r, 32), leftPad(s, 32)]);
}

function webPushInfo(receiverPublicKey: Buffer, senderPublicKey: Buffer) {
  return Buffer.concat([
    Buffer.from("WebPush: info\0"),
    receiverPublicKey,
    senderPublicKey,
  ]);
}

function hkdf(salt: Buffer, ikm: Buffer, info: Buffer, length: number) {
  const prk = createHmac("sha256", salt).update(ikm).digest();
  const blocks: Buffer[] = [];
  let previous = Buffer.alloc(0);
  let counter = 1;

  while (Buffer.concat(blocks).length < length) {
    previous = createHmac("sha256", prk)
      .update(Buffer.concat([previous, info, Buffer.from([counter])]))
      .digest();
    blocks.push(previous);
    counter += 1;
  }

  return Buffer.concat(blocks).subarray(0, length);
}

function leftPad(value: Buffer, length: number) {
  if (value.length >= length) {
    return value.subarray(value.length - length);
  }

  return Buffer.concat([Buffer.alloc(length - value.length), value]);
}

function canSendDirectWebPush() {
  return Boolean(WEB_PUSH_VAPID_SUBJECT && WEB_PUSH_VAPID_PUBLIC_KEY && WEB_PUSH_VAPID_PRIVATE_KEY);
}

function base64UrlToBuffer(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  return Buffer.from(`${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function base64UrlEncode(value: Buffer) {
  return value
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function updateDelivery(delivery: Delivery, status: DeliveryResult["status"], lastError = "") {
  const url = new URL(`${SUPABASE_URL}/rest/v1/notification_deliveries`);
  url.searchParams.set("id", `eq.${delivery.id}`);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      ...supabaseHeaders(),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status,
      last_error: lastError || null,
      attempt_count: Number(delivery.attempt_count || 0) + 1,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update delivery ${delivery.id}: ${response.status} ${await response.text()}`);
  }
}

function supabaseHeaders() {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
