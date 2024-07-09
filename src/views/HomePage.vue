<template>
    <AdminLayout>
        <div class="px-4 mb-8 grid sm:grid-cols-2 grid-cols-1 gap-4">
            <template v-for="(gacha, key) in gachas">
                <GachaCard v-if="gacha.count_rest" :gacha="gacha"/>
            </template> 
            <template v-for="(gacha, key) in gachas">
                <GachaCard v-if="!gacha.count_rest" :gacha="gacha"/>
            </template>
        </div>
    </AdminLayout>
</template>

<script>
import AdminLayout from './layout/Admin.vue';
import axios from 'axios';
import GachaCard from './parts/GachaCard.vue';
import { SERVER_URL } from '../config';

export default {
    components: { AdminLayout, GachaCard },
    
    data() {
        return {
            gachas: []
        }
    },
    methods: {
        getGachas() {
            axios.get(`${SERVER_URL}/api/gachas`).then(res => {
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