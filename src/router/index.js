import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '../views/HomePage.vue'

import TermsConditions from '../views/main/TermsConditions.vue'
import PrivacyPolicy from '../views/main/PrivacyPolicy.vue'
import NotationCommercial from '../views/main/NotationCommercial.vue'
import GachaDetail from '../views/GachaDetail.vue'

// Authentication
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue';

import Profile from '../views/Client/Profile/index.vue';

import Point from '../views/Client/Point/Index.vue';
import PointPurchase from '../views/Client/Point/Purchase.vue';
import PointSuccess from '../views/Client/Point/Success.vue';

import Purchase from '../views/Client/Payment/Index.vue';

import Products from '../views/Client/Products/Index.vue';

import Address from '../views/Client/Address/Index.vue';
import Coupon from '../views/Client/Coupon/Index.vue';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/terms-conditions',
        name: 'terms-conditions',
        component: TermsConditions
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicy
    },
    {
        path: '/notation-commercial',
        name: 'notation-commercial',
        component: NotationCommercial
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword
    },

    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/point',
        name: 'point',
        component: Point
    },
    {
        path: '/purchase/:id',
        name: 'purchase',
        component: Purchase
    },
    {
        path: '/point/success',
        name: 'point-success',
        component: PointSuccess
    },
    {
        path: '/point/purchase/:id',
        name: 'point-purchase',
        component: PointPurchase
    },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/address',
        name: 'address',
        component: Address
    },
    {
        path: '/coupon',
        name: 'coupon',
        component: Coupon
    },
    {
        path: '/gacha/:id',
        name: 'gacha',
        component: GachaDetail,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.name !== 'home' && to.name !== 'login' && to.name !== 'register' && to.name !== 'forgot-password' && to.name !== 'terms-conditions' && to.name !== 'privacy-policy' && to.name !== 'notation-commercial' && to.name !== 'point/success') {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
