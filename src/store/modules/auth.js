import axios from 'axios';
import { toast } from 'vue3-toastify';
import { SERVER_URL } from '../../config';

async function setUserInfo(state, token) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
        await axios.get(`api/auth/user`).then(res => {
            state.user = res.data;
            state.token = token;
            state.isAuth = true;
        });

    } catch (error) {
        console.error('Error setting user info:', error);
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
        axios.post(`api/auth/login`, {
            email: email,
            password: password
        }).then(async res => {
            if(res.data.success == 1){
                commit('SET_USER', res.data.user);
                commit('SET_TOKEN', res.data.token);
                commit('SET_ISAUTH', true);
            } else if(res.data.success == 0){
                toast('<strong>通知</strong> \n' + res.data.message, {
                    "theme": "auto",
                    "type": "error",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
            } else if (res.data.success == 2){
                commit('SET_ERRORS', res.data.message);
                console.log(state)
            }
            // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            // commit('SET_ISAUTH', true);
            // commit('SET_USER', res.data.token);
            // commit('SET_TOKEN', res.data.token);
        }).catch(err => {
            this.errors = err;
        });
        
        return true;
    },

    removeEmailErrors({ commit }) {
        commit('REMOVE_EMAIL_ERRORS');
    },

    removePasswordErrors({ commit }) {
        commit('REMOVE_PASSWORD_ERRORS');
    },

    async LogOut({ commit }) {
        commit('LOGOUT')
    },

    async checkLoginState({ commit }) {

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        await axios.post(`${SERVER_URL}/api/auth/user`)
        .then(res => {
            commit('UPDATE_USER', res.data);
            commit('SET_ISAUTH', true);
        }).catch(err => {
            console.error('Error checking login state:', err);
        });
    }

};

const mutations = {
    async SET_USER(state, user) {
        // setUserInfo(state, token);
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
        console.log('removeEmail');
        state.errors.email = [];
    },

    SET_PASSWORD_ERRORS(state, errors) {
        state.errors.password = errors;
    },

    REMOVE_PASSWORD_ERRORS(state){
        console.log('removePassword');
        // state.errors.password = [];
        state.errors = { ...state.errors, password: null };
        console.log('Updated state.errors.password:', state); // Add this line
    },

    LOGOUT(state) {
        state.user = null
        state.token = ""
        state.isAuth = false;
        localStorage.removeItem('token');
    },

    UPDATE_USER(state, user) {
        state.user = user;
    },


    
};



export default {
    state,
    getters,
    actions,
    mutations,
};