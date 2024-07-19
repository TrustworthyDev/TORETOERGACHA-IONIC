import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

var state = {
    stripe: null,
    elements: null,
    card: '',
    clientSecret: '',
}

export default {
    state,
    getters: {
        stripe: state=>state.stripe,
    },
    actions: {
        async setStripe(){
            this.stripe = await loadStripe('pk_test_51PdUhZC4Xd09tPMvWmmSWiSGErXyVG633Xru1sQjCngNriz1IlAzO47jKMjYjaz0v28tWOAoIPzLtvIz8OsopgUC000yADmwVs');
            this.elements = this.stripe.elements();
            this.card = this.elements.create('card');
            this.card.mount('#card-element');
            this.createPaymentIntent();
        }
    }
}
