<template>
    <!-- <Layout :hide_footer="true"> -->
    <AdminLayout>
        <div v-if="gacha" class="w-full relative">
            <div class="w-full h-full overflow-y-auto">
                <div class="w-full mx-auto bg-white md:py-6 py-0">
                    <div class="mx-auto relative w-full md:max-w-[430px]">
                        <div class="flex justify-end p-6 absolute top-0 w-full">
                            <button class="rounded-full py-0.5 w-fit px-4  border-2 border-white bg-white items-center flex align-center">
                                <span class="font-semibold ">残&nbsp;&nbsp;</span>
                                <span class="font-semibold ">{{format_number(gacha.count_rest)}}</span> 
                                <span class="">/{{format_number(gacha.count_card)}}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            <!-- </button>
                            <button class="rounded-full py-1 text-white w-[135px]  border-2 border-white bg-sky-500"> -->
                                <img v-bind:src="SERVER_URL + '/images/icon_cash.png'" class="w-5 h-5"/>&nbsp;&nbsp;
                                <span class="font-semibold ">{{format_number(gacha.point)}}</span> 
                                <span class="">PT</span>
                            </button>
                        </div>
                        <img :src="SERVER_URL + gacha.image" class="block w-full mb-[140px]"/>
                    </div>
                </div>
            </div>
            
            <div class="absolute w-full" style="bottom:60px;">
                <GachaButtons :gacha="gacha" />
            </div>
        </div>
    </AdminLayout>

</template>

<script>
import axios from 'axios';
import { IonButton } from '@ionic/vue';

import  AdminLayout from '../../Layout/Admin.vue';
import UserLayout from '../../Layout/User.vue';
import { SERVER_URL } from '../../../config';
import GachaButtons from '../../Parts/GachaButtons.vue';

export default {
    components: { AdminLayout, GachaButtons },
    data() {
        return {
            gacha: null,
            SERVER_URL: SERVER_URL
        }
    },
    methods: {
        format_number(n) {
            // return n;
            return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');
        },
        getGacha() {
            axios.get(`detail/gacha/${this.$route.params.id}`).then(res => {
                this.gacha = res.data.gachas[0];
            });
        }
    },
    beforeMount() {
        this.getGacha();
    }
}
</script>