import axios from 'axios';
import { toast } from 'vue3-toastify';

import auth from './auth';

const state = {
    user: auth.user
};

const getters = {

}

const actions = {
    updateProfileInformation({ commit }, { name, email, phone }) {
        axios.put('/api/profile', { name, email, phone })
            .then(response => {
                console.log(response);
                toast('<strong>通知</strong> \n' + response.data.message, {
                    "theme": "auto",
                    "type": "success",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
                commit('SET_USER_NAME', name);
                commit('SET_USER_EMAIL', email);
                commit('SET_USER_PHONE', phone);
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
    SET_USER_NAME(state, name) {
        state.user.name = name;
    },
    SET_USER_EMAIL(state, email) {
        state.user.email = email;
    },
    SET_USER_PHONE(state, phone) {
        state.user.phone = phone;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}