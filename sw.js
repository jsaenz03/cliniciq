/**
 * Service Worker for ClinicIQ Solutions Website
 * Optimized for Netlify CDN with Cache First for static assets
 * and Network First for HTML pages
 */

const CACHE_NAME = 'cliniciq-solutions-v3';
const RUNTIME_CACHE = 'cliniciq-runtime-v3';

// Critical assets to pre-cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching critical files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker: Error caching files', error);
      })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.skipWaiting();
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - Smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network First for HTML (always get fresh content from Netlify)
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh HTML
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Offline fallback to cached HTML
          return caches.match(request).then((cached) => {
            return cached || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache First for static assets (CSS, JS, images, fonts)
  if (
    request.url.endsWith('.css') ||
    request.url.endsWith('.js') ||
    request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i) ||
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Return cached version immediately
          // Update cache in background
          fetch(request)
            .then((response) => {
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, response);
              });
            })
            .catch(() => {
              // Fail silently - we have cached version
            });
          return cached;
        }

        // Not in cache, fetch and cache
        return fetch(request)
          .then((response) => {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // Network failed and no cache
            console.log('Service Worker: Failed to fetch', request.url);
          });
      })
    );
    return;
  }

  // For everything else, try network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});