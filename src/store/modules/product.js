// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);
import axios from 'axios';

export default {
    state: {
        products: [],
        products_count: 0,
    },

    mutations: {
        SET_PRODUCTS: (state, products) => {
            state.products = products;
        },

        SET_PRODUCTS_COUNT: (state, count) => {
            state.products_count = count;
        }
    },

    actions: {
        getProducts: async ({ commit }, tab_id) => {
            try {
                const response = await axios.get(`/api/products/` + tab_id);
                await commit('SET_PRODUCTS', response.data.products);
                await commit('SET_PRODUCTS_COUNT', response.data.products.length);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },

        exchangeToPoint: async ({ commit }, data) => {
            const response = await axios.post('/api/products/exchange', data);
            
        }
    },

    getters: {
        products: state => state.products,
        products_count: state => state.products_count
    }
}