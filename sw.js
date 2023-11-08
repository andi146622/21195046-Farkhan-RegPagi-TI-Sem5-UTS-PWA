var cacheName = 'portfolio-pwa';
var filesToCache = ['/', '/index.html', 'css/style.css', 'js/script.js', 'js/notification.js', 'js/indexDB.js', '/manifest.json', '/profile.png', 'https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js', 'https://unpkg.com/scrollreveal'];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)));
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
