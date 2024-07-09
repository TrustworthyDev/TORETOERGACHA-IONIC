<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-60">
            登録時のメールアドレスを入力してください！
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="メールアドレス" />
                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus autocomplete="username" />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    パスワードリセットメールを送信
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
        
</template>

<script>
    import GuestLayout from '../Layout/Guest.vue';
    import InputLabel from '../Components/InputLabel.vue'
    import TextInput from '../Components/TextInput.vue'
    import InputError from '../Components/InputError.vue'
    import PrimaryButton from '../Components/PrimaryButton.vue'


    export default {
        components: {
            GuestLayout,
            InputLabel,
            TextInput,
            InputError,
            PrimaryButton
        },

        data(){
            return {
                status: null,
                form: {
                    email: '',
                    errors: {},
                    processing: false,
                }
            }
        }
    }

</script>