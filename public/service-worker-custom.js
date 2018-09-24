const version = 'v1::';
self.addEventListener('install', (event) => {
  console.log('WORKER: install event in progress.');
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'swa')
      .then((cache) => {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources we've indicated to the cache,
           after making HTTP requests for each of them.
        */
        return cache.addAll([
          '/',
          '/index.html',
        ]);
      })
      .then(() => {
        console.log('WORKER: install completed');
      }),
  );
});
self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
});
