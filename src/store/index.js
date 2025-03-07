import Vuex from 'vuex';
// import Vue from 'vue';
import auth from './modules/auth';
import address from './modules/address';
import profile from './modules/profile';
import point from './modules/point';
import product from './modules/product';
import coupon from './modules/coupon';
import page from './modules/page';

// Load Vuex
// Vue.use(Vuex);
// Create store
export default new Vuex.Store({
    modules: {
        auth,
        address,
        profile,
        point,
        product,
        coupon,
        page
    },
});
