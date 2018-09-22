import { Firebase } from './firebase-realtime';

const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

navigator.serviceWorker
  .register(swUrl)
  .then((registration) => {
    Firebase.messaging().useServiceWorker(registration);
  });
const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = Firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    return token;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default askForPermissioToReceiveNotifications;
