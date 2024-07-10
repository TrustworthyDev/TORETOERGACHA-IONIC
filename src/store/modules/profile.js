import axios from 'axios';
import { toast } from 'vue3-toastify';

const state = {
    user: {}
};

const getters = {

}

const actions = {
    updateProfileInformation({ commit }, form) {
        console.log(form);
        axios.put('/api/profile', form)
            .then(response => {
                toast('<strong>通知</strong> \n' + response.data.message, {
                    "theme": "auto",
                    "type": "success",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            });
    },

    updateProfilePassword({ commit }, form) {
        axios.put('api/profile/password', form)
            .then(response => {
                if(response.data.success) {
                    toast('<strong>通知</strong> \n' + 'パスワードを更新しました。', {
                        "theme": "auto",
                        "type": "success",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                } else {
                    toast('<strong>通知</strong> \n' + '現在のパスワードが一致しません。', {
                        "theme": "auto",
                        "type": "error",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
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