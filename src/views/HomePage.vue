<template>
    <Layout>
        <div class="px-4 mb-8 grid sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="(gacha, key) in gachas">
                <GachaCard v-if="gacha.count_rest" :gacha="gacha"/>
            </template> 
            <template v-for="(gacha, key) in gachas">
                <GachaCard v-if="!gacha.count_rest" :gacha="gacha"/>
            </template>
        </div>
    </Layout>
</template>

<script>
import Layout from './Layout.vue';
import axios from 'axios';
import GachaCard from './parts/GachaCard.vue';

export default {
    components: { Layout, GachaCard },
    
    data() {
        return {
            gachas: []
        }
    },
    methods: {
        getGachas() {
            axios.get(`http://127.0.0.1/api/gachas`).then(res => {
                if (res.data.success) {
                    this.gachas = res.data.gachas;
                }
            });
        }
    },
    mounted() {
        this.getGachas();
    }
}
</script>