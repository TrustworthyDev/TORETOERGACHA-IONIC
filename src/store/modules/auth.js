//store/modules/auth.js
import axios from 'axios';

const state = {
    user: null,
    isAuth: false,
    token: localStorage.getItem("token") || "",
    point: 0,
    
};

const getters = {
    isAuth: state => state.isAuth,
    user: state => state.user,
    token: state => state.token
};

const actions = {
    async LogIn({ commit }, token) {
        commit('setUser', token);
    },

    async LogOut({ commit }) {
        commit('LogOut')
    },

    checkLoginState({ commit }) {
        const status = localStorage.getItem('isLoggedIn') === 'true';
        commit('setLoginState', status);
    }
};

const mutations = {
    setLoginState (state, status) {
        state.isAuth = status;
    },

    async setUser(state, token) {
        localStorage.setItem("token", token);
        document.cookie = `token=${token}; path=/; SameSite=Strict; Secure`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        state.token = token
        state.isAuth = true;

        await axios.get(`auth/user`, {
            email: this.email,
            password: this.password,
        }).then(res => {
            state.user = res.data;
            localStorage.setItem('user', JSON.stringify(res.data));
        })

    },

    async getUser(state){
        axios.get(`${SERVER_URL}/auth/user`).then(res => {
            state.user = res.data;
            console.log(res.data);
        })
    },


    LogOut(state) {
        state.user = null
        state.token = ""
        state.isAuth = false;
    },

    
};

export default {
    state,
    getters,
    actions,
    mutations
};
