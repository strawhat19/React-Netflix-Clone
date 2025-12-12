/* public/service-worker.js */
/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */

// Increment this to invalidate old caches when you deploy
const CACHE_VERSION = "v1.0.0";
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-cache-${CACHE_VERSION}`;

// Core shell files to pre-cache (keeps app bootable offline)
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico"
];

// Install: pre-cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategies:
// - HTML navigation → network-first (fallback to cached /)
// - Static JS/CSS → cache-first
// - Images → cache-first
// - APIs (TMDB/Firebase/etc) → network-first with cache fallback
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Handle navigation requests (SPA routes)
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, STATIC_CACHE, "/"));
    return;
  }

  // Same-origin static assets
  if (url.origin === self.location.origin) {
    // Static build assets (CRA puts them under /static/)
    if (
      url.pathname.startsWith("/static/") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".woff") ||
      url.pathname.endsWith(".woff2")
    ) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }

    // Images & posters from your own domain
    if (request.destination === "image") {
      event.respondWith(cacheFirst(request, RUNTIME_CACHE));
      return;
    }
  }

  // Example: TMDB / Firebase / other APIs → network-first
  if (
    url.hostname.includes("themoviedb.org") ||
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("googleapis.com")
  ) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

// ---- Helpers ----

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const networkResponse = await fetch(request);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}

function isCacheableRequest(request) {
  try {
    const url = new URL(request.url);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function networkFirst(request, cacheName, fallbackPath) {
  if (!isCacheableRequest(request)) {
    return fetch(request);
  }
  const cache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    // Only cache good responses
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Optional: for navigation, fall back to /
    if (fallbackPath && request.mode === "navigate") {
      const fallbackResponse = await cache.match(fallbackPath);
      if (fallbackResponse) return fallbackResponse;
    }

    // Last resort: generic response
    return new Response("You are offline and this resource is not cached.", {
      status: 503,
      headers: { "Content-Type": "text/plain" }
    });
  }
}