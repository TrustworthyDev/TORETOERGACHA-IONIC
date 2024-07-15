<template>
    <div  class="cursor-pointer border-4 border-[#60493d] mb-0 relative rounded-[20px] shadow w-full bg-cover overflow-hidden bg-[#60493d]">
        <div @click="clickCard">
            <img v-bind:src=gacha.thumbnail />
        </div>
        
        <div v-if="gacha.count_rest==0" class="absolute bottom-0 w-full h-full bg-opacity-70 z-10 bg-black flex items-center justify-center">
            <img v-bind:src="SERVER_URL + '/images/sold_out.png'" class="w-[75%]"/>
        </div>

        <div class="bottom-0 w-full p-2 rounded-b-[20px]">
            <div class="px-4 text-white">
                <div class="px-1 flex flex-row justify-between mb-1">
                    <div>
                        <span class="text-sm">残 </span>
                        <span class="font-semibold text-base">{{format_number(gacha.count_rest)}}</span> 
                        <span class="text-sm">/{{format_number(gacha.count_card)}}</span>
                    </div>
                    <div>
                        <span class="inline-block align-middle pr-2"><img class="h-5" src="/images/icon_cash.png"/> </span>
                        <span class="font-semibold">{{format_number(gacha.point)}}</span> 
                        <span>PT</span>
                    </div>
                </div>
                <div class="mb-1">
                    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
                        <div class="h-4 rounded-full " :class="get_progress_value().bg_color" :style=" {width: get_progress_value().value + '%'}" ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { SERVER_URL } from '../../config';
import { useIonRouter } from '@ionic/vue';

export default {
    props: {
        gacha: Object,
    }, 
    data () {
        return {
            url_card: "#",
            str_gacha10: "",
            point_10gacha: 0,
            SERVER_URL
        };
    },  
    methods: {
        get_progress_value() {
            let p = Math.round(this.gacha.count_rest * 100.0/this.gacha.count_card)
            let bg_color = 'bg-red-500';
            if (p>33) bg_color = 'bg-yellow-500';
            if (p>66) bg_color = 'bg-green-500'
            return {value: p, bg_color: bg_color}
        },
        format_number(n) {
            return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');
        }, 
        
        getImageClass(image) {
            return "url('"+ image +"')";
        }, 

        clickCard() {
            if(this.gacha.count_rest>0) {
                this.ionRouter.push({
                    name: 'gacha',
                    params: {
                        id: this.gacha.id,
                        cat_id: this.gacha.category_share
                    }
                });
            }
        }
    },
    mounted() {
        this.gacha.thumbnail = SERVER_URL + this.gacha.thumbnail;
        if(this.gacha.count_rest<10) { 
            this.str_gacha10 = "全て";
            this.point_10gacha = this.gacha.count_rest * this.gacha.point;
        } else {
            this.str_gacha10 = "10連";
            this.point_10gacha = 10 * this.gacha.point;
        }
    },
    setup() {
        const ionRouter = useIonRouter();
        return { ionRouter };
    },
}
</script>