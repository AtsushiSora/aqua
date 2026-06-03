// Copy this file to supabase-config.js and fill in browser-safe public values.
// index.html already tries to load supabase-config.js before app.js.
// Do not put service role keys, OpenAI keys, or other server-only secrets here.
window.AQUANOTE_SUPABASE_CONFIG = {
  url: "https://your-project.supabase.co",
  publishableKey: "your-publishable-key",
  mediaBucket: "aquanote-media",
};

window.AQUANOTE_PUSH_CONFIG = {
  // Must match WEB_PUSH_VAPID_PUBLIC_KEY in Netlify environment variables.
  publicKey: "your-vapid-public-key",
};
