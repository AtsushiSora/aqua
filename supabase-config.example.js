// Copy this file to supabase-config.js and fill in your Supabase project values.
// index.html already tries to load supabase-config.js before app.js.
window.AQUANOTE_SUPABASE_CONFIG = {
  url: "https://your-project.supabase.co",
  publishableKey: "your-publishable-key",
  mediaBucket: "aquanote-media",
};

window.AQUANOTE_PUSH_CONFIG = {
  publicKey: "your-vapid-public-key",
};
