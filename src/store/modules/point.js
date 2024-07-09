import axios from 'axios';

var state = {
    points: []
}

export default {
    state,
    getters: {
        points: state => state.points
    },
    actions: {
        getPoints: async ({ commit }) => {
            const response = await axios.get('api/points');
            commit('setPoints', response.data);
        }
    }
}
