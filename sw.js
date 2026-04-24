const CACHE_NAME = 'dsa-tracker-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './img/chest.svg',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installation: Assets in den Cache laden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch: Lade aus dem Cache, wenn verfügbar. Sonst aus dem Netz.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});