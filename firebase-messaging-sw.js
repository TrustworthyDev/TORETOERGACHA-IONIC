importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDmpf-xlW60NX5ViFGYmJFHYqixxToaYkk",
    authDomain: "toretoregacha-9c891.firebaseapp.com",
    projectId: "toretoregacha-9c891",
    storageBucket: "toretoregacha-9c891.appspot.com",
    messagingSenderId: "9341295938",
    appId: "1:9341295938:web:740232dc2411870460bcdb",
    measurementId: "G-PZTSYC89KQ"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
