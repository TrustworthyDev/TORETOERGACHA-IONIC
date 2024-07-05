import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TestPage from '../views/TestPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
