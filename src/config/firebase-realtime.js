import firebase from 'firebase';
import DB_CONFIG from './config';

export const Firebase = firebase.initializeApp(DB_CONFIG);
export const notesDatabase = Firebase.database().ref().child('notes');
