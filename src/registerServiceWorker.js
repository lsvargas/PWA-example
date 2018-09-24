import idb from 'idb';
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const applicationServerPublicKey = 'BFbv4YkqjHiMlGG0yiI6ivCzwaGiXBBMqYownr8-xFMONx5fcMAvwCn7p0gM6GLPXVQ6S11za6Pf4TVA2WSKsCM';
const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'
    // 127.0.0.1/8 is considered localhost for IPv4.
    || window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function createDB() {
  idb.open('products', 1, (upgradeDB) => {
    let store = upgradeDB.createObjectStore('beverages', {
      keyPath: 'id',
    });
    store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
    store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
    store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
  });
}

export default function register() {
  if (process.env.NODE_ENV === 'development' && 'serviceWorker' in navigator && 'PushManager' in window) {
    // The URL constructor is available in all browsers that support SW.
    console.log('service worker and push is suported');
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service '
              + 'worker. To learn more, visit https://goo.gl/SC7cgQ',
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
    window.addEventListener('install', (event) => {
      console.log('se va a guardar la base de datos');
      event.waitUntil(
        createDB()
      );
    });
    window.addEventListener('push', (event) => {
      const promiseChain = window.registration.showNotification('Hello, World.');
      console.log('agarre el evento push');
      event.waitUntil(promiseChain);
    });
    window.addEventListener('fetch', (event) => {
      console.log(event.request.url);
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // registration.showNotification('Se esta registrando el service worker');
      const applicationServerKeyConst = urlB64ToUint8Array(applicationServerPublicKey);
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKeyConst,
      }).then((subscription) => {
        console.log('user is subscribed.');
      });
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404
        || response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
        console.log('estamos bien');
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}



export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
