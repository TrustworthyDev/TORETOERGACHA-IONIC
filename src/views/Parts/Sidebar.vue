<template>
    <ul class="text-neutral-700 font-semibold">
        <div class="mt-1.5 pl-8 py-2 text-lg font-bold">{{ menu_title }}</div>
        <template v-for="item in main_menu">

            <li v-if="item.type=='link'" :class="getActiveColor(item.route_name)" class=" text-sm mx-8 my-2 border hover:bg-zinc-200 px-2 py-2 hover:no-underline font-bold">
                <a :href="item.route_name" class="py-2 px-4 w-full text-start no-underline" as="button"> {{ item.title }} </a>
            </li>
            
        </template>
        <li class=" text-sm mx-8 my-2 border hover:bg-zinc-200 py-2 px-2 font-bold">
            <a @click="logout" class="py-2 px-4 w-full text-start" as="button">ログアウト</a>
        </li>
    </ul>
</template>

<script>
    import { mapActions } from 'vuex';
    import user_menu from '../Store/user-menu';

    export default {
        
        data(){
            return {
                main_menu: user_menu,
                current_route: "",
                menu_title: "マイページ",
            }
        }, 

        mounted(){
            this.main_menu = [
                {
                    title: "ユーザー情報管理",
                    route_name : "/profile",
                    type: "link",
                },
                ...this.main_menu
            ];
        },
        
        methods: {
            getActiveColor(route_name) {
                if(this.current_route.indexOf(route_name) !== -1) {
                    return 'text-neutral-900 text-base';
                } else {
                    return 'text-neutral-700 hover:text-neutral-900 text-sm hover:underline';
                }
                
            },
            ...mapActions(["LogOut"]),        
            async logout() {
                await this.LogOut();
                this.sidebarOpened = false;
                window.location.href = 'login';
            }
        },  
    }
    
</script>