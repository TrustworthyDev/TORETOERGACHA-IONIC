import axios from 'axios';

const state = {
    profile: {},
    errors: {}
}

const getters = {
    profile(state){
        return state.profile;
    },

    errors(state){
        return state.errors;
    }
}

const actions = {
    async getProfile({commit}){
        await axios.get('/api/profile').then((response) => {
            commit('SET_PROFILE', response.data.profile);
        });
    },

    async saveProfile({commit}, profile){
        try {
            const response = await axios.post('/api/profile', profile);
            commit('SET_PROFILE', response.data.profile);
            // commit('SET_ERRORS', {});
            // return response.data.message;

          } catch (error) {
            // if (error.response && error.response.status === 422) {
            //     console.log(error.response.data.errors);
            //   commit('SET_ERRORS', error.response.data.errors);
            // } else {
            //   // Handle other errors
            //   console.error('An error occurred:', error);
            // }
          }
        
        // commit('SET_PROFILE', response.data);
    }
}

const mutations = {
    SET_PROFILE(state, profile){
        state.profile = profile;
    },

    SET_ERRORS(state, errors){
        state.errors = errors;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}