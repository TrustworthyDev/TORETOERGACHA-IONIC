import axios from 'axios';
import { toast } from 'vue3-toastify';

const state = {
    coupon: null,
};

const mutations = {
    setCoupon(state, coupon) {
        state.coupon = coupon;
    },
};

const actions = {
    async getCoupon({ commit }, coupon) {
        axios.post('api/coupons', {
            coupon: coupon,
        })
        .then(response => {
            if(!response.data.success){
                toast('<strong>通知</strong> \n' + response.data.message, {
                    "theme": "auto",
                    "type": "error",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
    },
};

const getters = {
    coupon: state => state.coupon,
};

export default {
    state,
    mutations,
    actions,
    getters,
};