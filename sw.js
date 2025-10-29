/**
 * Service Worker Cleanup Script
 *
 * This ServiceWorker has been disabled to allow Netlify to handle all:
 * - SSL/TLS termination
 * - CDN edge caching
 * - Automatic optimizations (image optimization, compression, etc.)
 * - Analytics tracking
 * - Cache headers (_headers file)
 *
 * This script unregisters any existing ServiceWorker and clears all caches
 * to ensure Netlify has full control over all requests.
 *
 * Browser caching is now handled via Netlify's _headers file:
 * - HTML: 1 hour cache
 * - Static assets: 1 year immutable cache
 * - Fast repeat loads without ServiceWorker interference
 */

// Unregister this ServiceWorker immediately on install
self.addEventListener('install', (event) => {
  console.log('ServiceWorker: Cleanup mode - unregistering...');
  self.skipWaiting();
});

// Clean up all caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('ServiceWorker: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('ServiceWorker: All caches cleared');
      console.log('ServiceWorker: Netlify now handles all caching');

      // Unregister this ServiceWorker
      return self.registration.unregister();
    }).then(() => {
      console.log('ServiceWorker: Successfully unregistered');
      console.log('Netlify is now in full control of SSL, CDN, and caching');

      // Claim all clients to ensure cleanup happens immediately
      return self.clients.claim();
    })
  );
});

// No fetch event handler - let all requests go directly to Netlify
// This ensures:
// - Netlify CDN handles all requests
// - Netlify Analytics tracks all pageviews
// - Netlify optimizations (image optimization, compression) work properly
// - SSL/TLS handled by Netlify
// - Browser cache (_headers) provides fast repeat loads
