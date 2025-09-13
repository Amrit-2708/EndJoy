// Very small cache-first SW for demo purposes
const CACHE = 'weekendly-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    try {
      const fresh = await fetch(e.request);
      if (fresh && e.request.method === 'GET' && e.request.url.startsWith(self.location.origin)) {
        const cache = await caches.open(CACHE);
        cache.put(e.request, fresh.clone());
      }
      return fresh;
    } catch (err) {
      if (cached) return cached;
      throw err;
    }
  })());
});
