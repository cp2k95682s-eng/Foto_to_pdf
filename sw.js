// Service Worker für Foto→PDF
// Cached die App + alle externen Bibliotheken beim ersten Start
// Nach dem ersten Aufruf läuft alles offline.

const CACHE_NAME = 'foto2pdf-v3';

const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

const EXTERNAL_FILES = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core.wasm.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd.wasm.js',
  'https://tessdata.projectnaptha.com/4.0.0/deu.traineddata.gz',
  'https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES).catch(err => {
        console.warn('Konnte einige Dateien nicht cachen:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req).then(response => {
        if (response && response.status === 200 &&
            (response.type === 'basic' || response.type === 'cors' || response.type === 'opaque')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, clone).catch(() => {});
          });
        }
        return response;
      }).catch(() => {
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline und nicht im Cache', { status: 503 });
      });
    })
  );
});
