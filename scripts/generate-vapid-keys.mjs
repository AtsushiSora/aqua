import { createECDH } from "node:crypto";

function base64UrlEncode(value) {
  return value
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

const vapid = createECDH("prime256v1");
vapid.generateKeys();

console.log("WEB_PUSH_VAPID_PUBLIC_KEY=" + base64UrlEncode(vapid.getPublicKey()));
console.log("WEB_PUSH_VAPID_PRIVATE_KEY=" + base64UrlEncode(vapid.getPrivateKey()));
