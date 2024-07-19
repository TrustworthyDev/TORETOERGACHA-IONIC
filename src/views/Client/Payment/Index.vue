<template>
    <AdminLayout>
    <div class="flex my-8 py-8  justify-center bg-gray-100">
        <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold mb-4">¥&nbsp;{{ point ? point : 0 }}</h2>

            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="card-element" class="block text-sm font-medium text-gray-700">Credit or debit card</label>
                    <div id="card-element" class="mt-1">
                        <!-- Stripe.js will inject the card element here -->
                    </div>
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Pay
                </button>
            </form>
        </div>
    </div>
</AdminLayout>
</template>

<script>
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { mapActions } from 'vuex';
import { toast } from 'vue3-toastify';

import AdminLayout from '../../Layout/Admin.vue';


export default {
    components: {
        AdminLayout,
    },

    data() {
        return {
            stripe: null,
            point: 0,
            elements: null,
            card: '',
            clientSecret: '',
            id: '',
        };
    },
    created() {
        // this.id = this.$route.params.id;
    },
    async mounted() {
        this.stripe = await loadStripe("pk_test_51PdUhZC4Xd09tPMvWmmSWiSGErXyVG633Xru1sQjCngNriz1IlAzO47jKMjYjaz0v28tWOAoIPzLtvIz8OsopgUC000yADmwVs");
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
    },

    watch: {
        point: {
            handler: 'createPaymentIntent',
            immediate: true
        }
    },


    methods: {
        ...mapActions(['setStripe']),
        configureStripe(){
            this.setStripe();
        },
        async createPaymentIntent() {
            const response = await axios.post('/api/create-payment-intent', {
                id: this.$route.params.id
            });
            this.clientSecret = response.data.clientSecret;
            this.point = response.data.point;
        },

        async handleSubmit() {
            try {
                const { paymentIntent, error } = await this.stripe.confirmCardPayment(this.clientSecret, {
                    payment_method: {
                        card: this.card,
                        billing_details: {
                            name: 'Customer Name',
                        },
                    },
                });

                if (error) {
                    console.error('Payment failed:', error);
                    // Display error message to the user
                } else if (paymentIntent.status === 'succeeded') {
                    this.$router.replace('/point/success');
                    // Handle successful payment
                }
            } catch (err) {
                console.error('Error confirming card payment:', err);
                // Handle error
            }
        }

    },
};
</script>

<style>
/* Add your styles here */
</style>
