<template>
    <div class="flex justify-between">
        <div class="flex items-center">
            <a href="/">
                <img src="../../../public/assets/img/logo.png" class="max-h-12 max-w-full mx-auto" alt="logo">
            </a>
        </div>
        <div class="flex justify-center items-center">
            <RouterLink :to="{ path: 'login' }" class="text-black border-[1px] h-8 px-5 border-solid rounded-md border-neutral-600 hover:text-white hover:bg-[#896858] text-sm flex items-center">ログイン</RouterLink>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
        components: {
            RouterLink
        },

        data() {

        }
    }
    

</script>