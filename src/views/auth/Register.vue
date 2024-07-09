<template>
    <Layout>

        <div class="pt-6 md:px-20 px-4 md:mx-0 mx-2 h-fit">
            <form @submit.prevent="submit">
                <h2 class="mb-10 text-xl text-center font-bold underline underline-offset-8">
                    &nbsp;&nbsp;&nbsp;{{ step_titles[step_integer] }}&nbsp;&nbsp;</h2>
                <div v-if="step_integer == 2">
                    <!-- <div class="flex items-center justify-center">
                        <button type="submit" :class="{ 'opacity-25': processing }" :disabled="processing" class="inline-flex items-center px-10 py-2 bg-blue-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-900 active:bg-indigo-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
                            登録
                        </button>
                    </div> -->
                    <div class="mb-6">
                        <label for="phone" class="block text-md font-bold text-neutral-700 p-2">電話番号</label>
                        <input v-model="phone" id="phone" type="tel"
                            class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3 bg-white font-black"
                            placeholder="半角数字のみで入力してください" />
                        <div v-if="errors.phone" v-for="error in errors.phone" class="text-red-500 text-sm mt-1">
                            {{ error }}
                        </div>
                    </div>

                    <div class="block mb-6">
                        <label for="password" class="block text-md font-bold text-neutral-700 p-2">パスワード</label>
                        <input v-model="password" id="password" :type="passwordFieldType"
                            class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3"
                            placeholder="半角英数字6～20文字" />
                        <div v-if="errors.password" v-for="error in errors.password" class="text-red-500 text-sm mt-1">
                            {{ error }}
                        </div>
                    </div>

                    <div class="block mb-6" v-if="passwordFieldType == 'password'">
                        <label for="password_confirmation" class="block text-md font-bold text-neutral-700 p-2">パスワード確認</label>
                        <input v-model="password_confirmation" id="password_confirmation" :type="passwordFieldType"
                            class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3" />
                    </div>

                    <div class="block mb-8">
                        <ion-checkbox @click="switchVisibility()"
                            style="--size: 20px; --checkbox-background-checked: #60493d; --border-color: #60493d; --border-color-checked: #60493d;"
                            class="text-md font-bold" label-placement="end">パスワードを表示</ion-checkbox>
                    </div>

                    <div class="flex items-center justify-center mt-10">
                        <button type="submit" :class="{ 'opacity-25': processing }" :disabled="processing"
                            class="inline-flex items-center px-8 py-1.5 bg-[#896858] hover:bg-[#60493d] border border-transparent font-semibold text-md text-white uppercase tracking-widest active:bg-indigo-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
                            登録
                        </button>
                    </div>
                </div>
                <div v-if="step_integer == 1">
                    <div class="mb-8">
                        <label for="code" class="block text-md text-neutral-700 p-2">登録したメールに送信された4行の認証コードを入力してください。</label>
                        <input v-model="code" id="code" type="tel"
                            class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3 bg-white"
                            placeholder="認証コードを入力してください" />
                        <InputError class="mt-2" :message="errors.code" />
                    </div>

                    <div class="flex items-center justify-center mt-10">
                        <button type="submit" :class="{ 'opacity-25': processing }" :disabled="processing"
                            class="inline-flex items-center px-8 py-1.5 bg-[#896858] hover:bg-[#60493d] border border-transparent font-semibold text-xs text-white uppercase tracking-widest active:bg-red-800 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
                            次へ
                        </button>
                    </div>
                </div>

                <div v-if="step_integer == 0">
                    <div class="mb-4">
                        <label for="email" class="block text-md font-bold text-neutral-700 p-2">メールアドレス</label>
                        <input v-model="email" id="email" type="email"
                            class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3 bg-white" />
                        <div v-if="errors.email" v-for="error in errors.email" class="text-red-500 text-sm mt-1">
                            {{ error }}
                        </div>
                    </div>

                    <div class="mt-10 flex items-center justify-center">
                        <button type="submit" :class="{ 'opacity-25': processing }" :disabled="processing"
                            class="inline-flex items-center px-8 py-1.5 bg-[#896858] hover:bg-[#60493d] border border-transparent font-semibold text-sm text-white uppercase tracking-widest active:bg-indigo-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
                            認証へ進む
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-center mt-8 mb-8 pb-8">
                    <RouterLink :to="{ name: 'login'}" class="underline underline-offset-4">すでにアカウントをお持ちの方はこちら</RouterLink>
                </div>
            </form>
            
        </div>

    </Layout>

</template>
<script>
import axios from 'axios';
import Layout from '../layout/Admin.vue';
import { IonButton, IonCheckbox } from '@ionic/vue';
import { SERVER_URL } from '../../config';
import { ref } from 'vue';
import { useIonRouter } from '@ionic/vue';

export default {
    components: { Layout, IonButton, IonCheckbox },

    data: () => ({
        passwordFieldType: "password",
        step_integer: 0,
        step_titles: ['アカウント登録', '認証コード入力', 'ご本人認証'],
        processing: false,
        data: {},
        SERVER_URL,
        email: "",
        code: "",
        phone: "",
        password: "",
        password_confirmation: "",
        errors: {},
    }),
    methods: {
        submit() {
            if (this.step_integer == 0) {
                axios.post(`auth/register/send`, {
                    email: this.email
                }).then(res => {
                    if (res.data.success) {
                        this.step_integer = 1;
                    }
                    else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    this.errors = err.response.data;
                });
            } else if (this.step_integer == 1) {
                axios.post(`auth/register/verify`, {
                    email: this.email,
                    code: this.code
                }).then(res => {
                    if (res.data.success) {
                        this.step_integer = 2;
                    }
                    else {
                        alert(res.data.message);
                    }
                });
            } else {
                axios.post(`auth/register`, {
                    email: this.email,
                    phone: this.phone,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }).then(res => {
                    if (res.data.success) {
                        window.location.href = "login";
                    }
                    else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    this.errors = err.response.data;
                });
            }

        },
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
            if (this.passwordFieldType === "text") {
                this.password_confirmation = this.password;
            }
        },
    },
    setup() {
        const ionRouter = useIonRouter();
        return { ionRouter };
    },
    mounted() {

    },
}
</script>