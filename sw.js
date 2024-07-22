const CACHE_NAME = "static_cache";
const STATIC_ASSETS = [
  "./how-it-works.png",
  "./index.html",
  "./jssha-512.js",
  "./logo.png",
  "./logo.ico",
  "./script.js",
  "./scrypt.js",
  "./style.css"
];

async function preCache() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(STATIC_ASSETS);
}

self.addEventListener("install", (event) => {
  console.log("SW Installed");
  self.skipWaiting();
  event.waitUntil(preCache());
});

async function cleanupCache() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map((key) => {
      if (key !== CACHE_NAME) {
        return caches.delete(key);
      }
    })
  );
}

self.addEventListener("activate", (event) => {
  console.log("SW Activated");
  event.waitUntil(cleanupCache());
});

async function fetchAssets(event) {
  try {
    const response = await fetch(event.request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request, response.clone());
      return response;
    }
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
}

self.addEventListener("fetch", (event) => {
  console.log("SW Fetched");
  event.respondWith(fetchAssets(event));
});
