<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, getPlatforms } from '@ionic/vue';

import { FCM } from "@capacitor-community/fcm";
import { PushNotifications } from "@capacitor/push-notifications";

export default {
    components: { IonApp, IonRouterOutlet },
    data() {
        return {
            fcm: null,
            token: '',
            viewToken: false
        };
    },

    setup() {

    },

    methods: {
        async requestPermissionAndRegister() {
            const result = await PushNotifications.requestPermissions();
            console.log("result - ", result);
            if (result.receive === "granted") {
                console.log("Granted!!!");
                PushNotifications.register();
                console.log("Push Notification Register !!!!");
                this.initializeFCM();
            } else {
                console.error("Push Notification permission not granted");
            }
        },

        async initializeFCM (){
            console.log("initializeFCM");
            const fcm = new FCM();
            try {
                const token = await fcm.getToken();
                console.log("Token:", token);
            } catch (error) {
                console.error("Error getting token:", error);
            }

            fcm.onTokenRefresh().subscribe((newToken) => {
                console.log("Token refreshed:", newToken);
            });

            fcm.subscribeTo({ topic: "all" }).then(() => {
                console.log("Subscribed to topic");
                });

            fcm.onNotification().subscribe((notification) => {
                console.log("Notification received:", notification);
            });

            PushNotifications.addListener("pushNotificationReceived", (notification) => {
                console.log("Push received: ", notification);
            });

            PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
                console.log("Push action performed: ", notification);
            });
        }
    },

    async mounted() {
        this.requestPermissionAndRegister();
    }
};
</script>
