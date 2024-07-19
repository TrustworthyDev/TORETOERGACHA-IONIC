import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.css';
import "vue3-toastify/dist/index.css";
import 'vue-spinners/dist/vue-spinners.css'

import VueSpinners from 'vue-spinners/dist/vue-spinners.common';

import axios from 'axios';
import App from './App.vue'
import router from './router';
import store from './store/index';
import { SERVER_URL } from './config';

axios.defaults.baseURL = SERVER_URL + '';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  store.dispatch('checkLoginState');
} else {
  axios.defaults.headers.common['Authorization'] = ``;
  console.log('You should login first');
}


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

router.isReady().then(() => {
  app.mount('#app');
});