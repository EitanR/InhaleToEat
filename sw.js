const CACHE_NAME = 'inhale-to-eat-v1.12.1';

// The page itself must be cached for the app to work offline, so if any of
// these fail the install fails (and is retried later).
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Icons are nice to have. A missing or slow icon must never block the install
// (a single 404 used to fail the whole cache.addAll and leave no service
// worker at all), so each one is cached on its own and failures are ignored.
const OPTIONAL_ASSETS = [
  './icon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await cache.addAll(CORE_ASSETS);
      await Promise.all(OPTIONAL_ASSETS.map(url => cache.add(url).catch(() => {})));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
