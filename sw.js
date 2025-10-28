/**
 * Service Worker Cleanup for ClinicIQ Solutions Website
 * This service worker unregisters itself and clears all caches.
 * Netlify CDN now handles all caching and performance optimization.
 */

// Immediately unregister this service worker and clear all caches
self.addEventListener('install', (event) => {
  console.log('Service Worker: Uninstalling and clearing caches...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Service Worker: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate and unregister
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated for cleanup');
  event.waitUntil(
    self.registration.unregister().then(() => {
      console.log('Service Worker: Unregistered successfully');
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach(client => client.navigate(client.url));
    })
  );
});