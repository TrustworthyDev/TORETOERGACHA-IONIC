<script setup>
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';

import InputError from '../../../Components/InputError.vue';
import InputLabel from '../../../Components/InputLabel.vue';
import PrimaryButton from '../../../Components/PrimaryButton.vue';
import TextInput from '../../../Components/TextInput.vue';

const store = useStore();
const user = useStore().getters.user;

const form = {
    current_password: user.password,
    password: '',
    password_confirmation: '',
};



const updatePassword = () => {
    if(form.password == form.password_confirmation) {
        store.dispatch('updateProfilePassword', form);
    } else {
        toast('<strong>通知</strong> \n' + 'パスワードが一致していません。', {
            "theme": "auto",
            "type": "warning",
            "autoClose": 2500,
            "dangerouslyHTMLString": true
        })
    }
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">パスワードを更新する</h2>
            <p class="mt-1 text-sm">安全を確保するには、アカウントで長くてランダムなパスワードを使用するようにしてください。</p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="現在のパスワード"  class="pl-2" />
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                    />
                <!-- <InputError :message="form.errors.current_password" class="ml-2 mt-2" /> -->
            </div>

            <div>
                <InputLabel for="password" value="新しいパスワード"  class="pl-2"/>
                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                    />
                <!-- <InputError :message="form.errors.password" class="ml-2 mt-2" /> -->
            </div>

            <div>
                <InputLabel for="password_confirmation" value="パスワードの確認" class="pl-2" />
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                    />
                <!-- <InputError :message="form.errors.password_confirmation" class="ml-2 mt-2" /> -->
            </div>

            <div class="flex gap-4 items-center">
                <div class="text-center border border-[#d9cd93] rounded-full p-0.5 w-fit">
                    <button type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing" class="inline-block items-center px-10 py-1 bg-gradient-to-b from-[#d9cd93] to-[#70612a] rounded-full font-semibold text-md text-white uppercase tracking-widest hover:bg-indigo-900 active:bg-indigo-900">
                        保存
                    </button>
                </div>
                <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                    <p v-if="form.recentlySuccessful" class="text-sm">保存されました。</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
