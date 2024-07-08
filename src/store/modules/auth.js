//store/modules/auth.js

import axios from 'axios';
const state = {
    user: null,
    token: "",
};
const getters = {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    token: state => state.token
};

const actions = {
    async LogIn({ commit }, token) {
        await commit('setUser', token)
    },
    async LogOut({ commit }) {
        commit('LogOut')
    }
};
const mutations = {
    async setUser(state, token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        state.user = await axios.get(`auth/user`);
        state.token = token
    },
    LogOut(state) {
        state.user = null
        state.token = ""
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
