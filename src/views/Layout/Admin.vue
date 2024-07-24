<template>
    <ion-page>
        <ion-content style="--backgound-color: white">
            <div class="flex min-h-screen text-neutral-700 text-base underline-offset-2 font-medium">
                <TransitionRoot :show="sidebarOpened" class="h-full">
                    <Dialog :open="sidebarOpened" @close="sidebarOpened = false" class="fixed h-full inset-0 z-40 ">
                        <TransitionChild enter="transition ease-in-out duration-200 transform"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transition ease-in-out duration-200 transform" leave-from="translate-x-0"
                            leave-to="translate-x-full" as="template">
                            <div
                                class="flex flex-col relative z-10 h-full w-64 bg-gray-100 border-l border-neutral-200 ml-auto">
                                <button @click="sidebarOpened = false"
                                    class="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full focus:outline-none "
                                    type="button" value="Close sidebar">
                                    <XMarkIcon class="h-5 w-5" />
                                </button>

                                <div class="flex-1 overflow-y-hidden">
                                    <Sidebar />
                                </div>
                            </div>
                        </TransitionChild>
                        <TransitionChild enter="transition-opacity ease-linear duration-200" enter-from="opacity-0"
                            enter-to="opacity-100" leave="transition-opacity ease-linear duration-200"
                            leave-from="opacity-100" leave-to="opacity-0" as="template">
                            <DialogOverlay class="fixed inset-0"></DialogOverlay>
                        </TransitionChild>
                    </Dialog>
                </TransitionRoot>


                <TransitionRoot :show="isDialogMessage" class="h-full">
                    <Dialog :open="isDialogMessage" @close="isDialogMessage = false" class="fixed h-full inset-0 z-40 ">
                        <TransitionChild enter="transition ease-in-out duration-200 transform"
                            enter-from="translate-y-full" enter-to="translate-y-0"
                            leave="transition ease-in-out duration-200 transform" leave-from="translate-y-0"
                            leave-to="translate-y-full" as="template">
                            <div
                                class="flex flex-col text-neutral-700 rounded relative z-20 top-20  w-64 bg-neutral-50 border-l border-neutral-200 m-auto">
                                <div class="pt-3 pb-1 px-1 text-center font-bold">
                                    {{ dialogTitle }}
                                </div>

                                <div class="px-4 text-sm text-center">
                                    {{ dialogMessage }}
                                </div>

                                <hr class="mt-3" />
                                <button @click="isDialogMessage = false"
                                    class="cursor-pointer p-2 text-cyan-500 text-center text-base focus-visible:outline-0">
                                    OK
                                </button>
                            </div>
                        </TransitionChild>
                        <TransitionChild enter="transition-opacity ease-linear duration-200" enter-from="opacity-0"
                            enter-to="opacity-100" leave="transition-opacity ease-linear duration-200"
                            leave-from="opacity-100" leave-to="opacity-0" as="template">
                            <DialogOverlay class="fixed inset-0 bg-neutral-600 h-full bg-opacity-50"></DialogOverlay>
                        </TransitionChild>
                    </Dialog>
                </TransitionRoot>

                <div class="min-h-screen w-full flex flex-col">
                    <div class="flex-shrink-0 w-full">
                        <div class="flex justify-center px-2 py-1">
                            <div class="md:w-[760px] w-full flex py-1 mx-auto justify-center items-center gap-1">
                                <div class="flex items-center flex-1">
                                    <a href="/" class="flex">
                                        <img class="mx-auto max-h-14 max-w-full mx-3 my-2" alt="とれとれガチャステーション"
                                            src="/images/logo.png" />
                                    </a>
                                </div>

                                <a href="point" v-if="isAuth"
                                    class="flex text-center text-sm text-white rounded-md bg-[#896858] overflow-hidden h-fit">
                                    <div class="flex items-center py-1 px-3">
                                        <img src="/images/icon_cash.png" class="h-6 mr-2" />
                                        <span class="font-bold">{{ user ? user.point : 0 }}&nbsp;PT</span>
                                    </div>
                                    <div class="flex items-center bg-[#60493d] px-2.5">
                                        <span class="text-lg">+</span>
                                    </div>
                                </a>

                                <div class="relative flex-shrink-0 flex items-center">
                                    <img v-if="isAuth" @click="sidebarOpened = true"
                                        class="w-8 h-8 inline cursor-pointer" src="/images/dopakun.png" />
                                    <RouterLink v-else :to="{ path: '/login' }"
                                        class="h-8 border-solid border-neutral-600 hover:bg-[#896858] border rounded-md flex items-center px-5 text-sm text-black hover:text-white">
                                        ログイン
                                    </RouterLink>
                                </div>

                            </div>
                        </div>
                    </div>

                    <main class="w-full flex-1 " :class="{'relative' : show_result_bg !== 'gacha_detail'}">
                        <div class="absolute w-full h-full overflow-y-auto">
                            <div class="min-h-full flex flex-col">
                                <div :class="{ 'md:w-[760px]': !show_result_bg, 'flex-1 w-full mx-auto footer_padding bg-no-repeat bg-cover': true }">
                                    <div 
                                        :style="[show_result_bg == 'gacha_result' ? { backgroundImage: result_bg_image } : {}]"
                                        class="bg-no-repeat bg-cover bg-center" 
                                        :class="{'relative' : show_result_bg === 'gacha_detail'}"
                                    >
                                        <slot />
                                    </div>
                                </div>
                                <div v-if="!hide_footer" class="w-full">
                                    <div class="md:w-[760px] w-full mx-auto  pt-5 md:px-2 px-4 items-start">
                                        <div class="md:w-[760px] w-full text-center mx-auto pb-2 md:px-2 px-4 flex flex-wrap md:gap-20 md:justify-center">
                                            <a href="terms-conditions"
                                                class="text-inherit-400 text-center md:w-auto w-[100%]">利用規約</a>
                                            <a href="privacy-policy"
                                                class="text-inherit-400 text-center md:w-auto w-[100%]">プライバシーポリシー</a>
                                            <a href="notation-commercial"
                                                class="text-inherit-400 text-center md:w-auto w-[100%]">特定商取引法に基づく表記</a>
                                        </div>
                                        <hr class="border-black" />
                                        <div class="md:w-[760px] w-full text-center mx-auto pt-1 pb-5 md:px-2 px-4">
                                            <span class="text-inherit-100 text-sm font-semibold mr-3">とれとれガチャステーション
                                            </span>
                                            <span class="text-inherit-400 text-xs">© {{ year }} all rights
                                                reserved
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>

import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

import { XMarkIcon, ChevronLeftIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { useIonRouter, IonPage, IonContent, IonButton } from '@ionic/vue';
import { mapActions } from "vuex";
import Sidebar from '../Parts/Sidebar.vue';
import { mapGetters } from 'vuex/dist/vuex.cjs.js';

// import Toastify from "toastify-js";

export default {
    components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, XMarkIcon, ChevronLeftIcon, Bars3Icon, Menu, MenuButton, MenuItems, MenuItem, IonPage, IonContent, IonButton, Sidebar },
    props: {
        hide_footer: Boolean
    },
    data() {
        return {
            sidebarOpened: false,
            isDialogMessage: false,
            dialogMessage: "",
            dialogTitle: "",
            page_title: "",
            hide_cat_bar: "",
            hide_back_btn: "",
            show_result_bg: "",
            show_notification: 0,
            result_bg_image: "url(/images/result_bg.png)",
            point_value: "",
            main_menu: [
                {
                    title: "ポイント購入",
                    url: "point",
                    type: "link",
                },
                {
                    title: "獲得した商品一覧",
                    url: "products",
                    type: "link",
                },
                {
                    title: "個人情報登録",
                    url: "address",
                    type: "link",
                },
                {
                    title: "ポイント配布",
                    url: "coupon",
                    type: "link"
                }
            ],
            year: new Date().getFullYear(),
        }
    },
    methods: {
        ...mapActions(["LogOut"]),
        format_number(n) {
            return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1,');
        },
        notification(message) {
            if (message) {
                Toastify({
                    text: message,
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    className: "toastify-content newClass",
                    onClick: function () { } // Callback after click
                }).showToast();
            }
        },
        back() {
            window.history.back();
        },
        route(str) {
            return str;
        },
        getActiveColor(route_name) {
            if (this.ionRouter.name.indexOf(route_name) !== -1) {
                return 'text-neutral-900 text-base';
            } else {
                return 'text-neutral-700 hover:text-neutral-900 text-sm hover:underline';
            }
        },
        
        async logout() {
            await this.LogOut();
            this.sidebarOpened = false;
            window.location.href = 'login';
        }
    },
    setup() {
        const ionRouter = useIonRouter();
        return { ionRouter };
    },
    computed: {
        ...mapGetters(['user', 'isAuth']),
    },
    mounted() {
        this.show_result_bg = this.$store.getters['page'];
        console.log(this.show_result_bg)
    }
}
</script>