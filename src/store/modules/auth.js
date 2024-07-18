import axios from 'axios';
import { toast } from 'vue3-toastify';
import { SERVER_URL } from '../../config';

async function setUserInfo(state, token) {
    try {
        localStorage.setItem('token', token);
        await axios.get(`api/auth/user`).then(res => {
            state.user = res.data;
            state.token = token;
            state.isAuth = true;
        });

    } catch (error) {
        state.user = {};
        state.token = '';
        state.isAuth = false;
    }
}

const state = {
    user: {},
    token: '',
    isAuth: false,
    errors: {
        email: null,
        password: null,
    }
};

const getters = {
    user: state => state.user,
    token: state => state.token,
    isAuth: state => state.isAuth,
    errors: state => state.errors,
};

const actions = {
    async LogIn({ commit }, {email, password}) {
        try {
            const res = await axios.post(`api/auth/login`, {
                email: email,
                password: password
            });
            if(res.data.success == 1){
                console.log("LOGIN - VUEX");
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                commit('SET_USER', res.data.token);
                return true;
            }
        }
        catch (err) { this.errors = err; }
        return false;
    },

    removeEmailErrors({ commit }) {
        // commit('REMOVE_EMAIL_ERRORS');
    },

    removePasswordErrors({ commit }) {
        // commit('REMOVE_PASSWORD_ERRORS');
    },

    async LogOut({ commit }) {
        commit('LOGOUT')
    },

    async checkLoginState({ commit }) { 
        console.log('CHECK_LOGIN_STATE');
        await axios.get(`${SERVER_URL}/api/auth/user`)
        .then(res => {
            commit('SET_ISAUTH', true);
            commit('SET_TOKEN', localStorage.getItem('token'));
            commit('RESET_USER', res.data);
        }).catch(err => {
            console.error('Error checking login state:', err);
        });
    }

};

const mutations = {
    async SET_USER(state, token) {
        setUserInfo(state, token);
    },

    RESET_USER(state, user){
        state.user = user;
    },

    SET_TOKEN(state, token) {
        state.token = token;
    },

    SET_ISAUTH(state, isAuth) {
        state.isAuth = isAuth;
    },

    SET_ERRORS(state, errors) {
        state.errors = errors;
    },

    SET_EMAIL_ERRORS(state, errors) {
        state.errors.email = errors;
    },

    REMOVE_EMAIL_ERRORS(state){
        state.errors.email = [];
    },

    SET_PASSWORD_ERRORS(state, errors) {
        state.errors.password = errors;
    },

    REMOVE_PASSWORD_ERRORS(state){
        // state.errors.password = [];
        state.errors = { ...state.errors, password: null };
    },

    LOGOUT(state) {
        state.user = null
        state.token = ""
        state.isAuth = false;
        localStorage.removeItem('token');
    },
};



export default {
    state,
    getters,
    actions,
    mutations,
};