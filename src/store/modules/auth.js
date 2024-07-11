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
            this.token = res.data.token;
            commit('setUser', this.token);
        }).catch(err => {
            this.errors = err;
        });
        
    },

    async LogOut({ commit }) {
        commit('LogOut')
    },

    async checkLoginState({ commit }) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        await axios.post(`${SERVER_URL}/api/auth/user`, {
            id: localStorage.getItem('ID')
        }).then(res => {
            commit('CHECKLOGINSTATE', res.data);
        }).catch(err => {
            console.error('Error checking login state:', err);
        });
    }

};

const mutations = {
    async CHECKLOGINSTATE(state, data) {
        state.user = data;
        state.isAuth = true;
    },

    async setUser(state, token) {
        setUserInfo(state, token);
    },

    LogOut(state) {
        state.user = null
        state.token = ""
        state.isAuth = false;
        localStorage.removeItem('token');
        localStorage.removeItem('ID');
    },

    
};



export default {
    state,
    getters,
    actions,
    mutations,
};