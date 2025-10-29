/**
 * Service Worker for ClinicIQ Solutions Website
 * Optimized to work WITH Netlify CDN, not against it
 * Respects Cache-Control headers and Netlify optimizations
 */

const CACHE_NAME = 'cliniciq-solutions-v4';
const RUNTIME_CACHE = 'cliniciq-runtime-v4';
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Critical assets to pre-cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

// Helper: Check if response should be cached
function shouldCache(request, response) {
  // Only cache successful responses
  if (!response || response.status !== 200 || response.type === 'error') {
    return false;
  }

  // Respect Cache-Control: no-cache, no-store, private
  const cacheControl = response.headers.get('Cache-Control');
  if (cacheControl) {
    if (cacheControl.includes('no-cache') ||
        cacheControl.includes('no-store') ||
        cacheControl.includes('private')) {
      return false;
    }
  }

  return true;
}

// Helper: Check if request should bypass ServiceWorker
function shouldBypass(request) {
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return true;
  }

  // Skip Netlify Functions (/.netlify/functions/*)
  if (url.pathname.startsWith('/.netlify/')) {
    return true;
  }

  // Skip API calls and dynamic endpoints
  if (url.pathname.startsWith('/api/')) {
    return true;
  }

  // Skip analytics, tracking, ads
  if (url.hostname.includes('analytics') ||
      url.hostname.includes('googletagmanager') ||
      url.hostname.includes('doubleclick')) {
    return true;
  }

  return false;
}

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
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - Netlify-friendly caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass ServiceWorker for certain requests
  if (shouldBypass(request)) {
    return; // Let Netlify handle it directly
  }

  // Network First for HTML (always get fresh content from Netlify CDN)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache if Netlify allows it
          if (shouldCache(request, response)) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
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

  // Stale-While-Revalidate for static assets
  // Serves cached content immediately, updates in background
  if (
    request.url.endsWith('.css') ||
    request.url.endsWith('.js') ||
    request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff2?)$/i) ||
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        // Fetch fresh version in background
        const fetchPromise = fetch(request)
          .then((response) => {
            // Only cache if appropriate and response is valid
            if (shouldCache(request, response)) {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            // Network failed - return cached version if available
            return cached;
          });

        // Return cached version immediately if available, otherwise wait for network
        return cached || fetchPromise;
      })
    );
    return;
  }

  // For everything else, let Netlify CDN handle it (no SW interference)
  // This ensures Netlify's optimizations work properly
  return;
});