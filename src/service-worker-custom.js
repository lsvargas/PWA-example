export default function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
      // registration worked
        console.log(`Registration succeeded. Scope is ${registration.scope}`);
        return registration;
      }).catch((error) => {
      // registration failed
        console.log(`Registration failed with ${error}`);
      });
  }
}
