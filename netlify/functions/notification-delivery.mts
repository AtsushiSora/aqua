import type { Config } from "@netlify/functions";

const SUPABASE_URL = Netlify.env.get("SUPABASE_URL") || Netlify.env.get("VITE_SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const DELIVERY_DRY_RUN = Netlify.env.get("NOTIFICATION_DELIVERY_DRY_RUN") !== "false";
const RESEND_API_KEY = Netlify.env.get("RESEND_API_KEY") || "";
const EMAIL_FROM = Netlify.env.get("NOTIFICATION_EMAIL_FROM") || "";

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

  await updateDelivery(delivery, "failed", "Push provider is not configured");
  return { id: delivery.id, status: "failed", reason: "Push provider is not configured" };
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
