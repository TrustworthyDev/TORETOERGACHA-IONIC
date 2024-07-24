<template>
    <AdminLayout>
        <div class="pt-6 md:px-2 px-4" style="min-height:400px">  
            <h1 class="mb-2 text-lg font-bold">ガチャ完了</h1>
            <hr class="mb-8" />

            <div v-if="point" class="mb-6 text-center text-sm">
                計{{number_products}}点の商品を計{{point}}PTに交換しました。<br/>
                その他の商品は「獲得した商品一覧」に送りしています。
            </div>
            <div v-else class="mb-6 text-center text-sm">
                全ての商品を「獲得した商品一覧」にお送りしました。
            </div>
            
            <div v-if="gachas[0] && (gachas[0].ableCount > 0)" class="mb-8 text-center">
                <h3 class="text-base font-bold mb-2">もう一度ガチャる！</h3>
                <GachaButtons :gacha="gachas[0]" />
            </div>

            <div class="mb-12 text-center" >
                <a href="/" class="inline-block items-center px-4 py-2 m-1  bg-neutral-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-neutral-900 active:bg-neutral-900 focus:outline-none focus:border-neutral-900 focus:shadow-outline-neutral transition ease-in-out duration-150">
                    ガチャ選択ページへ
                </a>
                <a href="/products" class="inline-block items-center px-4 py-2 m-1 bg-neutral-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-neutral-700 active:bg-neutral-700 focus:outline-none focus:border-neutral-700 focus:shadow-outline-neutral transition ease-in-out duration-150">
                    獲得した商品一覧へ
                </a>
            </div>
        </div>
    </AdminLayout>
</template>

<script>
import axios from 'axios';

import  AdminLayout from '../../Layout/Admin.vue';
import UserLayout from '../../Layout/User.vue';
import GachaButtons from '../../Parts/GachaButtons.vue';

import { SERVER_URL } from '../../../config';

export default {
    components: {AdminLayout, GachaButtons}, 
    data() {
        return {
            number_products: 0,
            point: 0,
            gachas: [],
            token: ''
        }
    },
    created() {
        this.token = this.$route.query.token;
        console.log(this.token);
        this.getParams(this.token);
    },

    mounted() {
        // this.getParams(this.token)
    },

    methods: {
        async getParams(token){
            await axios.get(SERVER_URL + '/api/gacha/end/' + token).then((res) => {
                this.number_products = res.data.number_products;
                this.point = res.data.point;
                this.gachas = res.data.gachas;
            })
        }
    }
}
</script>