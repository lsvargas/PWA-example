export default function register() {
  if ('serviceWorker' in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker-custom.js`;
    navigator.serviceWorker.register(swUrl)
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
