<template>
    <Layout>
        <div class="pt-6 md:px-16 px-4 md:mx-0 mx-2">
            <h1 class="underline underline-offset-[12px] mb-10 text-center text-xl font-bold">
                &nbsp;&nbsp;&nbsp;ログイン&nbsp;&nbsp;&nbsp;
            </h1>
            <form @submit.prevent="submit()" class="flex flex-col gap-8">
                <div>
                    <label for="text1" class="block text-md font-bold text-neutral-700 p-2">メールアドレス</label>
                    <input v-model="email" id="text1" type="email"
                        class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3 bg-white" 
                        placeholder="例) user@Toretoreoripa.co"
                    />
                        <div v-if="errors.email" v-for="error in errors.email" class="text-red-500 text-sm mt-1">
                            {{ error }}
                        </div>

                    <div class="h-4"></div>
                    <label for="text2" class="block text-md font-bold text-neutral-700 p-2">パスワード</label>
                    <input v-model="password" id="text2" :type="passwordFieldType"
                        class="w-full shadow-xs border border-neutral-300 rounded-md placeholder-neutral-300 px-4 py-3 bg-white"
                        placeholder="半角英数字6～20文字"
                    />
                        <div v-if="errors.password" v-for="error in errors.password" class="text-red-500 text-sm mt-1">
                            {{ error }}
                        </div>
                </div>

                <div>
                    <ion-checkbox @click="switchVisibility()"
                        style="--size: 20px; --checkbox-background-checked: #60493d; --border-color: #60493d; --border-color-checked: #60493d; background:white"
                        class="text-md font-bold" label-placement="end">パスワードを表示</ion-checkbox>
                </div>

                <div class="text-center">
                    <button type="submit" :class="{ 'opacity-25': processing }" :disabled="processing"
                        class="inline-block items-center px-10 py-1.5 bg-[#60493d] hover:bg-[#896858] font-semibold text-md text-white uppercase tracking-widest">
                        ログイン
                    </button>
                </div>

                <div class="flex flex-wrap gap-4 justify-center my-4">
                    <div class="flex items-center justify-center">
                        <a href="/forgot-password" class="underline underline-offset-4">パスワードをお忘れの方はこちら</a>
                    </div>
                    <div class="flex items-center justify-center">
                        <RouterLink :to="{ name: 'register' }" class="underline underline-offset-4">新規会員登録はこちら
                        </RouterLink>
                    </div>
                </div>
            </form>
        </div>

    </Layout>

</template>
<script>
import axios from 'axios';
import { IonButton, IonCheckbox } from '@ionic/vue';
import Layout from '../Layout/Admin.vue';
import { mapActions } from "vuex";

export default {
    components: { Layout, IonButton, IonCheckbox },
    data: () => ({
        passwordFieldType: "password",
        email: "test@user.com",
        password: "Admin.1234",
        processing: false,
        errors: {},
    }),
    methods: {
        ...mapActions(["LogIn"]),

        submit() {
            axios.post(`api/auth/login`, {
                email: this.email,
                password: this.password
            }).then(async res => {
                if (res.data.success) {
                    await this.LogIn(res.data.token);
                    window.location.href = '/';
                    // this.$router.push({
                    //     name: 'Home'
                    // })
                }
                else {
                    alert(res.data.message);
                }
            }).catch(err => {
                this.errors = err;
            });
        },

        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },

        route(str) {
            return str;
        }
    },
    setup() {

    },
    mounted() {

    },
}
</script>