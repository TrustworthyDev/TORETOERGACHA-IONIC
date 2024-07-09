import Vuex from 'vuex';
// import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import address from './modules/address';

// Load Vuex
// Vue.use(Vuex);
// Create store
export default new Vuex.Store({
    modules: {
        auth,
        address
    },
    plugins: [createPersistedState()]
});
