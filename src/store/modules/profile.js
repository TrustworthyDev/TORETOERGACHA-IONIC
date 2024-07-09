import axios from 'axios';

const state = {
    user: {}
};

const getters = {

}

const actions = {
    updateProfileInformation({ commit }, form) {
        console.log(form);
        axios.post('/api/profile', form)
            .then(response => {
                commit('updateProfileInformation', response.data);
            });
    }
}

const mutations = {
    updateProfileInformation(state, data) {
        state.user = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}