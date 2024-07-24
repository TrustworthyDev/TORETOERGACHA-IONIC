import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.toretore.app',
  appName: 'ToretoreGacha',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  // },
  // "bundledWebRuntime": false,
  // "plugins": {
  //   "PushNotifications": {
  //     "presentationOptions": ["badge", "sound", "alert"]
  //   }
  }

};

export default config;
