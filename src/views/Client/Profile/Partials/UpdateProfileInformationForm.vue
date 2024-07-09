<script setup>
import { ref } from 'vue';
import InputError from '../../../Components/InputError.vue';
import InputLabel from '../../../Components/InputLabel.vue';
import TextInput from '../../../Components/TextInput.vue';


const props = defineProps({
    mustVerifyEmail: Boolean,
    status: String,
});

const user = JSON.parse(localStorage.getItem('user')) || {};

const form = {
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
};

const submit = () => {
   
}

</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium">プロフィール情報</h2>
            <p class="mt-1 text-sm">アカウントのプロフィール情報と電子メール アドレスを更新します。</p>
        </header>

        <form @submit.prevent="submit" class="mt-6 space-y-6">
            <div>
                <InputLabel for="name" value="名前" class=" pl-2" />
                <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus
                    autocomplete="name" />
                <!-- <InputError class="mt-2" :message="form.errors.name" /> -->
            </div>

            <div>
                <InputLabel for="email" value="電子メールアドレス" class=" pl-2" />
                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
                    autocomplete="email" />
                <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
            </div>

            <div>
                <InputLabel for="phone" value="電話番号" class=" pl-2" />
                <TextInput id="phone" type="text" class="mt-1 block w-full" v-model="form.phone" required
                    autocomplete="phone" />
                <!-- <InputError class="mt-2" :message="form.errors.phone" /> -->
            </div>

            <div class="flex gap-4 items-center">
                <div class="text-center border border-[#d9cd93] rounded-full p-0.5 w-fit">
                    <button type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                        class="inline-block items-center px-10 py-1 bg-gradient-to-b from-[#d9cd93] to-[#70612a] rounded-full font-semibold text-md text-white uppercase tracking-widest hover:bg-indigo-900 active:bg-indigo-900">
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
