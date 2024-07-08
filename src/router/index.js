import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '../views/HomePage.vue'
import TermsConditions from '../views/main/TermsConditions.vue'
import PrivacyPolicy from '../views/main/PrivacyPolicy.vue'
import NotationCommercial from '../views/main/NotationCommercial.vue'
import GachaDetail from '../views/GachaDetail.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

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
        path: '/main/terms_conditions',
        name: 'main.terms_conditions',
        component: TermsConditions
    },
    {
        path: '/main/privacy_policy',
        name: 'main.privacy_policy',
        component: PrivacyPolicy
    },
    {
        path: '/main/notation_commercial',
        name: 'main.notation_commercial',
        component: NotationCommercial
    },
    {
        path: '/gacha_detail/:id',
        name: 'gacha_detail',
        component: GachaDetail,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
