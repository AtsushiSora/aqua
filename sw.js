const CACHE_NAME = "aquanote-production-v66";
const ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/site-concept.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/maskable-icon-512.png",
  "./assets/icon.svg",
  "./assets/maskable-icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (shouldCacheRequest(event.request, response)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

          if (event.request.mode === "navigate") {
            return caches.match("./offline.html");
          }

          return Response.error();
        })
      )
  );
});

function shouldCacheRequest(request, response) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !response.ok) {
    return false;
  }

  if (url.pathname.startsWith("/api/")) {
    return false;
  }

  return ["document", "style", "script", "image", "manifest", ""].includes(request.destination);
}

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {};
  }

  const title = data.title || "AquaNote";
  const options = {
    body: data.body || "水槽管理のリマインダーがあります。",
    tag: data.tag || "aquanote-reminder",
    data: {
      url: data.url || "./#dashboard",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "./#dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existingClient = clients.find((client) => client.url.includes(self.location.origin));
      if (existingClient) {
        return existingClient.focus().then((client) => client.navigate(url));
      }

      return self.clients.openWindow(url);
    })
  );
});
