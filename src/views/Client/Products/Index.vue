<template>
    <AdminLayout>
        
        <div v-if="ready_delivery==0" style="min-height:400px;" class="px-4 md:px-8 w-full">  
            <div class="pt-3 pb-1 mx-4 px-4 mb-3 border-black">
                <h1 class="mb-8 text-lg text-center font-bold underline underline-offset-8">&nbsp;&nbsp;&nbsp;獲得した商品一覧&nbsp;&nbsp;&nbsp;</h1>
                <div class="w-full text-neutral-600 mb-3 flex justify-center">
                    <a 
                        v-for="(item, key) in tab" 
                        class="inline-block md:px-8 px-4 py-1.5 cursor-pointer hover:bg-[#e3e3e3]" 
                        :class="{'bg-[#896858] text-white': item.is_active}" 
                        @click="change_tab(item.id)"
                    >
                        {{item.title}}
                    </a>
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-1">
                <div 
                    v-for="(item, key) in products"
                    class="mt-1 py-2 px-3 hover:border-[1px] hover:border-[#444444] border-[1px] border-[#ffffff] focus:bg-sky-50"
                >
                    <div class="flex border-neutral-200 items-start select-none">
                        <input
                            v-if="tab_id==tab[0].id"
                            type="checkbox"
                            :id="'checkbox' + item.id" 
                            v-model="checks['id'+item.id]"
                            class="custom-checkbox cursor-pointer border-neutral-300 text-blue-600 shadow-sm focus:ring-0 m-1 bg-white"
                            @change="changeCheck(item.id)"
                        />
                            
                        <label :for="'checkbox' + item.id" class="cursor-pointer flex items-start justify-center inline-block text-sm py-1">
                            <img :src="item.image" class="w-32 h-32 inline-block object-contain"/>
                            <div class="ml-2 flex flex-col self-stretch justify-around py-3">
                                <div class="text-sm py-1 px-3">{{item.name}}</div>
                                <div class="text-sm py-1 px-3">{{item.rare}}</div>
                                <div v-if="item.is_lost_product!=2" class="flex bg-[#ff8000] justify-center items-center rounded-full px-3 md:my-1 mx-3 py-1 text-white w-fit">
                                    <img src="/images/icon_cash.png" class="h-5 mr-2" />
                                    <span>{{item.point}}&nbsp;PT</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div v-if="tab_id==tab[0].id" class="pb-6 pt-6 text-center text-md text-black">
                <template v-if="hasCheck">
                    選択した商品を...
                </template>
                <template v-else>
                    商品を選択してください！
                </template>
            </div>
            
            <div  v-if="tab_id==tab[0].id" class="mb-8 pb-8 text-center text-neutral-50">
                <button 
                    type="button" 
                    @click="exchange()" 
                    :class="{ 'opacity-25': processing || (!hasCheck) }" 
                    :disabled="processing || (!hasCheck)" 
                    class="w-40 inline-block items-center px-4 py-2 bg-[#896858] hover:bg-[#60493d] font-semibold text-sm text-white uppercase tracking-widest active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:shadow-outline-blue transition ease-in-out duration-150 m-1"
                >
                    <div>ポイントに換える</div>
                </button>
                <button 
                    type="button" 
                    @click="tranfer()" 
                    :class="{ 'opacity-25': processing || (!hasCheck) }" 
                    :disabled="processing || (!hasCheck)"
                    class="w-40 inline-block items-center px-4 py-2 hover:bg-[#896858] bg-[#60493d] font-semibold text-sm text-white uppercase tracking-widest active:bg-indigo-500 focus:outline-none focus:border-indigo-500 focus:shadow-outline-lime transition ease-in-out duration-150 m-1"
                >
                    <div>発送する</div>
                </button>
            </div>
        </div>        

        <div v-if="ready_delivery==1" class="pt-6 md:px-2 px-4" style="min-height:400px">  
            <h2 class="mb-2 text-lg font-bold">配送内容の確認</h2>
            <hr class="mb-6" />
            <div class="mb-3 text-sm">配送商品 （計{{products_count}}点）</div>
            <div class="mb-8">
                <template v-for="(item, key) in products">
                    <div  v-if="form.checks['id'+item.id]" class="mb-0  border-neutral-200 border-b">
                        <div class="flex border-neutral-200 items-center">
                            <img :src="item.image" class="w-12 h-12 inline-block object-contain"/>
                            <label :for="'checkbox' + item.id" class="cursor-pointer h-12 flex items-center justify-between flex-1 inline-block text-xs py-1 px-2 ">
                                <div>
                                    <div>{{item.name}}</div>
                                    <div>{{item.rare}}</div>
                                    <div class="text-red-500">{{item.point}}pt</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </template>
            </div>
            <div class="mb-2 text-sm">配送先情報</div>
            <div class="mb-8 border border-neutral-200 rounded-md px-4 py-2 flex items-center justify-between">
                <div class="flex-1">
                    <!-- <template v-if="profile.id">
                        <p class="font-bold text-sm">{{ profile.first_name + profile.last_name }}</p>
                        <p class="text-sm">〒{{ profile.postal_code }}</p>
                        <p class="text-sm">{{ profile.address }}</p>
                    </template> -->
                </div>
                <div>
                    <a :href="route('user.address')" type="button" @click="back_delivery()" :class="{ 'opacity-25': form.processing || (!hasCheck) }" :disabled="form.processing || (!hasCheck)" class="inline-block items-center px-5 py-1.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-[#896858] hover:bg-[#60493d] active:bg-neutral-700 focus:outline-none focus:border-neutral-700 focus:shadow-outline-neutral transition ease-in-out duration-150 m-1">
                        編集
                    </a>
                </div>
            </div>
            
            <div class="mb-8 text-center text-neutral-50">
                <button type="button" @click="back_delivery()" :class="{ 'opacity-25': form.processing || (!hasCheck) }" :disabled="form.processing || (!hasCheck)" class="w-32 inline-block items-center px-1 py-2.5 border border-transparent font-semibold text-xs text-white uppercase bg-[#896858] hover:bg-[#60493d] tracking-widest active:bg-cyan-700 focus:outline-none focus:border-cyan-700 focus:shadow-outline-cyan transition ease-in-out duration-150 m-1">
                    戻る
                </button>
                <button type="button" @click="submit_delivery()" :class="{ 'opacity-25': form.processing || (!hasCheck) }" :disabled="form.processing || (!hasCheck)" class="w-32 inline-block items-center px-1 py-2.5 border border-transparent font-semibold text-xs text-white uppercase hover:bg-[#896858] bg-[#60493d] tracking-widest active:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 m-1">
                    発送する
                </button>
            </div>
        </div>

        <div v-if="ready_delivery==2" class="pt-6 md:px-2 px-4" style="min-height:400px">  
            <h2 class="mb-2 text-lg font-bold">配送手続き完了</h2>
            <hr class="mb-8" />
            <div class="mb-8 ">
                計{{products_count}}点の商品の配送手続きが完了しました。<br/><br/>
                商品の発送には<span class="font-bold">数日~数週間</span>かかる可能性がございます。<br/>
                ご了承のほどよろしくお願い致します。
            </div>
           
            
            <div class="mb-6 text-center text-neutral-50">
                <a href="/" class="w-36 inline-block items-center px-1 py-2.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 m-1 bg-[#896858] hover:bg-[#60493d]">
                    ガチャTOPへ
                </a>

                <button type="button" @click="back_delivery()" :class="{ 'opacity-25': form.processing || (!hasCheck) }" :disabled="form.processing || (!hasCheck)" class="w-36 inline-block items-center px-1 py-2.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-cyan-700 focus:outline-none focus:border-cyan-700 focus:shadow-outline-cyan transition ease-in-out duration-150 m-1 hover:bg-[#896858] bg-[#60493d]">
                    獲得した商品一覧へ
                </button>
                
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
    .custom-checkbox {
        background-color: white !important;
    }

    ::v-deep input[type="checkbox"].custom-checkbox {
        background-color: white !important;
    }
</style>

<script>
import { IonCheckbox } from '@ionic/vue';
import { mapState, mapActions, mapGetters } from 'vuex';

import AdminLayout from '../../Layout/Admin.vue';

export default {
    components: {
        IonCheckbox, AdminLayout
    },
    data() {
        return {
            hasCheck: false,
            tab : [
                {title:"未選択", id: 1, is_active:true},
                {title:"発送待ち", id: 3, is_active:false},
                {title:"発送済み", id: 4, is_active:false},
            ],
            tab_id: 1,
            ready_delivery: 0,
            checks: [],
            checkboxes: [],
            processing: false,
            count: 0,
            points: 0,
            clicked: 0,
        }
    },
    setup() {
        document.title = '獲得した商品一覧 - とれとれガチャステーション';
    },
    created() {
        this.getProducts(this.tab_id);
    },
    computed: {
        ...mapGetters(['user', 'products', 'products_count']),
    },
    mounted() {
        // let check = {};
        // for(let i = 0; i < this.products_count; i++) {
        //     check['id'+ this.products[i]['id']] = false;            
        // }
        
        // const form = {
        //     checks: check
        // }
        // return { form }
            this.calcuateCount();
    },
    methods: {
        ...mapActions(['getProducts', 'exchangeToPoint', 'checkLoginStatus']),

        async change_tab (tab_id){
            this.tab_id = tab_id;
            this.tab.forEach(tab => tab.is_active = tab.id === tab_id);
            this.getProducts(tab_id);
        },

        changeCheck(id) {
            var value = false;
            var index = -1;
            if(!this.checkboxes.length){
                this.checkboxes.push(id);
            } else {
                for(let i = 0; i < this.checkboxes.length; i++) {
                    if(id == this.checkboxes[i]){
                        value = true;
                        index = i;
                        break;
                    }
                }

                if(value){
                    this.checkboxes.splice(index, 1);
                } else {
                    this.checkboxes.push(id);
                }
            }

            if(this.checkboxes.length) this.hasCheck = true;
            value = false;
            index = -1;

        },

        calcuateCount() {
            let count = 0; 
            var point = 0;
            for(let i = 0; i < this.products_count; i++) {
                if (this.checks['id' + this.products[i]['id']]) {
                    count++; 
                    point = parseInt(point) + parseInt(this.products[i]['point']);
                }
            }
            this.count = count;
            this.points = point;
        },

        async exchange() {
            this.calcuateCount();
            if(this.points>0) {
                if (confirm('交換しますか？ 選択した '+this.count+'点の商品を '+ this.points +'ptと交換します。')){
                    this.exchangeToPoint({
                        checks: this.checkboxes,
                        count: this.count,
                        points: this.points
                    }).then(res => {
                        this.getProducts(this.tab_id);
                    });
                }
            } 

        },

        async tranfer(){
            await this.calcuateCount();
            if (this.points < 1000) {
                alert('発送は１０００ポイント以上からお願いします。');
                return ;
            }

            if(products_count>0) {
                this.products_count = products_count;
                this.ready_delivery = 1;
            } 
        },
        back_delivery() {
            // this.ready_delivery = 0;
        },  
        submit_delivery() {
            // if(this.profile.address) {
            //     if (confirm(''+ this.products_count + '点の商品を配送しますか？')) {
            //         this.form.post(route('user.delivery.post'), {
            //             onFinish: () => {
                            
            //             },
            //         });
            //     }
            // } else {
            //     alert('入力エラー、配送先情報を入力してください。')
            // }
            
        },        
    },
    watch : {
        user: {
            handler(newVal, oldVal) {
                this.user.point = newVal.point;
            },
        },
    },
}
</script>
