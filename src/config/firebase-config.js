import firebase from 'firebase';
import DB_CONFIG from './config';

export const Firebase = firebase.initializeApp(DB_CONFIG);
// add all  the databases here
export const notesDatabase = Firebase.database().ref().child('notes');

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
