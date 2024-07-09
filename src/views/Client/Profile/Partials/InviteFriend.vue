<script setup>
// import { usePage, useForm } from '@inertiajs/inertia-vue3';
// import { ref } from 'vue';

// const props = defineProps({
//     invitations: Array,
// });

// const user = usePage().props.value.auth.user;

// const confirmInvitation = (id) => {
//     useForm({ id }).put(route('user.invitation.update'), {
//         preserveScroll: true,
//     });
// };

// const data = ref({
//     status: false
// });

// const onShowAll = () => {
//     data.value.status = !data.value.status
// }

</script>

<template>
    <section>
        <header class="">
            <h2 class="text-lg font-medium">友人招待</h2>
            <p class="text-sm mt-2">
                友達を紹介してポイントをもらいましょう。<br />
                ユーザー登録時にあなたの招待コードを入力するだけです。
            </p>
            <p class="text-sm mt-2">
                ※ポイントは招待者が入金した際に配布されます
            </p>
        </header>

        <div class="mt-2">
            <span class="w-full px-2 leading-8">{{  }}</span>
        </div>
    </section>
</template>
