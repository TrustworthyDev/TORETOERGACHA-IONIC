<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, getPlatforms } from '@ionic/vue';
import { FCM } from '@capacitor-community/fcm';
import { Plugins, Capacitor } from '@capacitor/core';
const { PushNotifications } = Plugins;

export default {
    components: { IonApp, IonRouterOutlet },
    data() {
        return {
            fcm: null,
            token: '',
            viewToken: false
        };
    },

    async mounted() {
        // try {
        //     // Check the device with getPlatforms
        //     console.log("Ionic platforms are: " + getPlatforms());

        //     // Check the device with Capacitor
        //     const device = Capacitor.getPlatform();
        //     console.log("Capacitor platform is: " + device);

        //     if (device === 'web') {

        //         firebase.initializeApp({
        //             apiKey: "AIzaSyDmpf-xlW60NX5ViFGYmJFHYqixxToaYkk",
        //             authDomain: "toretoregacha-9c891.firebaseapp.com",
        //             projectId: "toretoregacha-9c891",
        //             storageBucket: "toretoregacha-9c891.appspot.com",
        //             messagingSenderId: "9341295938",
        //             appId: "1:9341295938:web:740232dc2411870460bcdb",
        //             measurementId: "G-PZTSYC89KQ"
        //         });


        //         const messaging = firebase.messaging();

        //         try {
        //             try {
        //                 const permission = await Notification.requestPermission();
        //                 if (permission === 'granted') {
        //                     const token = await messaging.getToken();
        //                     this.token = token;
        //                     alert("FCM Token (Web): " + token);
        //                     console.log("FCM Token (Web): " + tken);
        //                 } else if (permission === 'denied') {
        //                     console.log("Permission for notifications was denied.");
        //                     alert("Permission for notifications was denied.");
        //                 } else {
        //                     console.log("Permission for notifications was dismissed.");
        //                     alert("Permission for notifications was dismissed.");
        //                 }
        //             } catch (error) {
        //                 console.log("Error getting FCM token for web: ", error);
        //             }
        //         } catch (error) {
        //             if (error.code === 'messaging/permission-blocked') {
        //                 console.log("Permission for notifications was blocked. Please enable notifications in your browser settings.");
        //                 alert("Permission for notifications was blocked. Please enable notifications in your browser settings.");
        //             } else {
        //                 console.log("Error getting FCM token for web: ", error);
        //             }
        //         }

        //     } else {
        //         console.log("Running in native environment.");

        //         // Native push notification setup
        //         const permissionResult = await PushNotifications.requestPermission();
        //         alert("Permission result: " + JSON.stringify(permissionResult));
                
        //         if (permissionResult.granted) {
        //             // Register for push notifications
        //             await PushNotifications.register();

        //             // Initialize the FCM plugin
        //             this.fcm = new FCM();

        //             // Add registration error listener
        //             PushNotifications.addListener("registrationError", (error) => {
        //                 console.log(`Error on register: ${JSON.stringify(error)}`);
        //             });

        //             // Add notification received listener
        //             PushNotifications.addListener("pushNotificationReceived", (notification) => {
        //                 console.log(`Notification received: ${JSON.stringify(notification)}`);
        //             });

        //             // Add action performed listener
        //             PushNotifications.addListener("pushNotificationActionPerformed", async (notification) => {
        //                 alert("Notification action performed: " + JSON.stringify(notification));
        //                 console.log("Notification action succeeded");
        //             });

        //             // Get FCM token
        //             const fcmToken = await this.fcm.getToken();
        //             this.token = fcmToken.token;
        //             alert("FCM Token: " + fcmToken.token);
        //             console.log("FCM Token: " + fcmToken.token);
        //         } else {
        //             console.log("Push notification permission denied");
        //         }
        //     }
        // } catch (error) {
        //     console.log("Error during push notification setup: " + JSON.stringify(error));
        // }
    }
};
</script>
