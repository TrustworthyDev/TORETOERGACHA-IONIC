import axios from 'axios';

const state = {
    profile: {},
    errors: {}
}

const getters = {
    getProfile(state){
        return state.profile;
    },

    getErrors(state){
        return state.errors;
    }
}

const actions = {
    async getProfile({commit}){
        const response = await axios.get('/api/profile');
        commit('setProfile', response.data);
    },

    async saveProfile({commit}, profile){
        try {
            const response = await axios.post('/api/profile', profile);
            commit('setProfile', response.data.profile);
            commit('setErrors', {});
            return response.data.message;

          } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
              commit('setErrors', error.response.data.errors);
            } else {
              // Handle other errors
              console.error('An error occurred:', error);
            }
          }
        
        // commit('setProfile', response.data);
    }
}

const mutations = {
    setProfile(state, profile){
        state.profile = profile;
    },

    setErrors(state, errors){
        state.errors = errors;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}