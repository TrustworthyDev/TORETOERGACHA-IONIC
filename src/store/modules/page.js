import axios from 'axios';
import { toast } from 'vue3-toastify';

const state = {
    page: '',
};

const mutations = {
    setStatePage(state, page) {
        state.page = page;
    },
};

const actions = {
    async setPage({ commit }, page) {
        commit('setStatePage', page)
    },
};

const getters = {
    page: state => state.page,
};

export default {
    state,
    mutations,
    actions,
    getters,
};