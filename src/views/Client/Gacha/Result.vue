<template>
    <AdminLayout>
        <div class="md:w-[760px] m-auto items-center flex justify-center" style="min-height: calc( 100vh - 230px );"><div>
            <h1 class="mb-2 text-neutral-100 text-xl underline underline-offset-8 py-8 text-center font-bold ">&nbsp;&nbsp;&nbsp;ガチャ – 結果&nbsp;&nbsp;&nbsp;</h1>
            <form @submit.prevent="submit()">
                <div class="mb-3 pt-4 flex flex-wrap justify-center" >
                    <template v-for="(product, key) in products">
                        <div class="relative">
                            <label  :for="('checkbox' + product.id)" class="z-10 block mb-5 mx-2.5 cursor-pointer text-center justify-center relative rounded-sm" style="width:142px;">
                                <div class="text-center p-0 relative mb-1" >
                                    <img class="inline-block w-full " :src="server_url + product.image" /> 
                                </div>
                                <div class="text-white text-left truncate text-center text-md px-4 mt-2" style="line-height:1.3">
                                    {{product.name}}
                                </div>
                                <div class="text-neutral-300 text-left text-md truncate mb-1 text-center px-4" style="line-height:1.3">
                                    {{product.rare}}
                                </div>
                                
                                <div class="flex justify-center items-center w-fit px-4 py-0.5 mx-auto text-white relative rounded-full text-xs text-center bg-[#60493d]" style="line-height:1.5;">
                                    <PlayIcon class="w-3 h-3 text-white mr-2"/>
                                    {{format_number(product.point)}}<span class="text-white" >&nbsp;PT</span>
                                </div>
                            

                                <div class="absolute -top-3.5 -right-2"> 
                                    <input :id="('checkbox' + product.id)" type="checkbox" v-model="form.checks['id'+product.id]" class="h-5 w-5 cursor-pointer rounded text-[#896858] shadow-sm"/>
                                </div>
                            </label>
                            

                            <div v-if="product.is_last" class="absolute top-0 left-0 z-0 w-full h-full flex justify-center items-center">
                                <img  src="/images/sparking_star.png" style="max-width:200%">
                            </div>
                            
                        </div>
                        
                    </template>
                    
                </div>

                <div class="text-center text-neutral-50 mb-6 z-10 relative">
                    <label class="cursor-pointer flex items-center justify-center">
                        <input type="checkbox" v-model="isCheckAll" @change="checkall()" class="h-6 w-6 rounded-sm border-neutral-300 text-[#896858] shadow-sm focus:ring-neutral-500"/>
                        <span class="ml-2 text-md font-bold">全てを選択する</span>
                    </label>
                </div>

                <div class="mb-3 text-center text-neutral-50 z-10 relative">
                    <button 
                        type="submit" 
                        :class="{ 'opacity-25': form.processing }" 
                        :disabled="form.processing" 
                        class="inline-block items-center px-8 py-2.5 bg-[#896858] hover:bg-[#60493d] rounded-lg font-semibold text-md text-white uppercase tracking-widest transition ease-in-out duration-150"
                    >
                        選択した商品をポイントに変換
                    </button>
                </div>
                <div class="pb-6 pt-4 text-center text-md font-bold text-neutral-200 z-10">
                    ※選択されなかった商品は「獲得済み 商品一覧」に移動されます。
                </div>
            </form>
        </div>
        </div>
        <!-- box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.6); -->

    </AdminLayout>
</template>

<script>
import { useForm } from '@inertiajs/inertia-vue3';
import AdminLayout from '../../Layout/Admin.vue';
import Footer from '../../Parts/Footer.vue';
import { PlayIcon } from '@heroicons/vue/24/solid';
import axios from 'axios';
import { mapActions } from 'vuex';
import { SERVER_URL } from '../../../config';

export default {
    components: {AdminLayout, PlayIcon},
    data(){
        return {
            // catagries: ['sdfads', 'abc', 'sdfads', 'sdfads'],
            isCheckAll: false,
            products: null,
            form: {
                processing: false,
                checks: []
            },
            token: '',
            server_url : SERVER_URL
            
        }  
    },
    created() {
        const token = this.$route.query.token;
        this.token = token;
        this.getRandom(token);
        this.setPage('gacha_result');

        
    },
    setup() {
        // let checks = {};
        // let i;
        // for(i=0; i<this.products.length; i++) {
        //     checks['id'+this.products[i]['id']] = false;            
        // }
        // const form = {
        //     checks: checks,
        //     token: this.token,
        // }

        // return { form }
    },
    methods : {
        ...mapActions(["setPage", "UpdateUserState"]),
        async getRandom(token){
            await axios.get(`api/gacha/result/` + token).then(res => {
                console.log(res);
                this.products = res.data.products;

                let checks = {};
                for(let i=0; i < this.products.length; i++) {
                    checks['id'+this.products[i]['id']] = false;            
                }
                const form = {
                    checks: checks,
                    token: this.token,
                }

                this.form = form;
            })
        },
        format_number(n) {
            return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');
        }, 
        async submit() {
            let i; let products_count = 0; var point = 0;
            for(i=0; i<this.products.length; i++) {
                if (this.form.checks['id'+this.products[i]['id']]) {
                    products_count++; point = point + parseInt(this.products[i]['point']);
                }
            }

            let need_submit = false;
            if(point>0) {
                if (confirm('交換しますか？ 選択した'+products_count+'点の商品を'+ point +'ptと交換します。')){
                    need_submit = true;
                }
            } else {
                if (confirm('全ての商品が「獲得済み商品一覧」に移動します。')){
                    need_submit = true;
                }
            }

            if (need_submit) {
                // this.form.post(SERVER_URL + 'api/gacha/result/exchange', {
                //     onFinish: () => {
                //     },
                // });

                await axios.post(SERVER_URL + '/api/gacha/result/exchange', this.form)
                .then((res) => {
                    console.log(res.data.user);
                    if(res.data.success){
                        this.UpdateUserState(res.data.user);
                        window.location.href = this.$router.resolve({
                            name: 'gachaEnd',
                            query: { token: this.token }
                        }).href;
                    }
                    
                })
            }            
        },
        checkall() {
            for(let i=0; i<this.products.length; i++) {
                this.form.checks['id'+this.products[i]['id']] = this.isCheckAll;            
            }
        },

    }
}
</script>