import axios from 'axios';
import { SERVER_URL } from '../../config';



async function setUserInfo(state, token) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
        await axios.get(`api/auth/user`).then(res => {
            state.user = res.data;
            state.token = token;
            state.isAuth = true;
            localStorage.setItem('ID', res.data.id);
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
    userId: localStorage.getItem('ID') || null,
};

const getters = {
    isAuth: state => state.isAuth,
    user: state => state.user,
    token: state => state.token,
    userId: state => state.userId
};

const actions = {
    async LogIn({ commit }, {email, password}) {
        axios.post(`api/auth/login`, {
            email: email,
            password: password
        }).then(async res => {
            commit('SET_ISAUTH', true);
            commit('SET_USER', res.data.token);
        }).catch(err => {
            this.errors = err;
        });
        
    },

    async LogOut({ commit }) {
        commit('LOGOUT')
    },

    async checkLoginState({ commit }) {

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        await axios.post(`${SERVER_URL}/api/auth/user`, {
            id: localStorage.getItem('ID')
        }).then(res => {
            commit('UPDATE_USER', res.data);
            commit('SET_ISAUTH', true);
        }).catch(err => {
            console.error('Error checking login state:', err);
        });
    }

};

const mutations = {
    async SET_USER(state, token) {
        setUserInfo(state, token);
    },

    LOGOUT(state) {
        state.user = null
        state.token = ""
        state.isAuth = false;
        localStorage.removeItem('token');
        localStorage.removeItem('ID');
    },

    UPDATE_USER(state, user) {
        state.user = user;
    },

    SET_ISAUTH(state, isAuth) {
        state.isAuth = isAuth;
    }
    
};



export default {
    state,
    getters,
    actions,
    mutations,
};