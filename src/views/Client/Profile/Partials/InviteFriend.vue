<script setup>
    import { useStore } from 'vuex';

    const user = useStore().getters.user;
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
            <span class="w-full px-2 leading-8">{{ user.invite_code }}</span>
        </div>
    </section>
</template>
