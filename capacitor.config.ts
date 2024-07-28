import { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'io.ionic.toretore.app',
  appName: 'とれとれガチャステーション',
  webDir: 'dist',
  bundledWebRuntime: false,
  // android: {
  //   googleServicesFile: './android/app/google-services.json',
  // },
  server: {
    androidScheme: 'https'
  } 

};

export default config;
