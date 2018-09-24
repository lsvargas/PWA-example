import FB_CONGIG from '../src/config/config';

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


firebase.initializeApp({
  messagingSenderId: FB_CONGIG.messagingSenderId,
});

const messaging = firebase.messaging();
