<template>
    <AdminLayout>
        <div class="flex justify-center">
            <div class="md:w-[760px] w-full min-h-screen flex flex-col">
                <div class="flex-1 flex flex-col items-center justify-around">
                    <div class="product-info">
                        <span class="product-title">ポイント購入</span>
                        <br>
                        <span class="product-amount"> ¥ 500</span>
                        <div class="check-agree">
                            <ion-checkbox type="checkbox" id="check-agree" name="check-agree" class="text-blue-600 focus:ring-0"></ion-checkbox>
                            <label for="check-agree">
                                <span>個人情報の取り扱いに同意する</span>
                                <a href="#" class="ml-2 text-blue-600 underline underline-offset-4">見る</a>
                            </label>
                        </div>
                    </div>
                    <div class="w-full flex justify-center pay-method">
                        <button class="rounded-lg border bg-white h-11 p-2 w-56 justify-center border-cyan-500 hover:bg-slate-100 flex items-center">
                            <img src="/images/icon_card.png" alt="CreditCard" class="h-full"/>
                            <span class="ml-2 text-lg font-bold">Card</span>
                        </button>
                    </div>
                    <div class="flex justify-center w-full pay-method">
                        <button class="rounded-lg border bg-white h-11 p-2 w-56 flex justify-center border-rose-500 hover:bg-slate-100">
                            <img src="/images/pay_pay_logo.svg" alt="Paypay" class="h-full"/>
                        </button>
                    </div>
                    <div class="flex justify-center w-full pay-method">
                        <button class="rounded-lg border bg-white h-11 w-56 flex justify-center border-green-500 hover:bg-slate-100 items-center">
                            <img src="/images/apple-pay-logo.svg" alt="Applepay" class="h-16"/>
                        </button>
                    </div>
                    <div class="card-info card-pay hidden">
                        <div class="label">
                            利用可能カード
                        </div>
                        <!-- <div class="w-full grid grid-cols-5 gap-1">
                            <img alt="VISA" src="/images/credit_cards/1.JPG" class="w-full"/>
                            <img alt="MasterCard" src="/images/credit_cards/2.JPG"  class="w-full"/>
                            <img alt="JCB" src="/images/credit_cards/3.JPG"  class="w-full"/>
                            <img alt="Express" src="/images/credit_cards/4.JPG"  class="w-full"/>
                            <img alt="International" src="/images/credit_cards/5.JPG"  class="w-full"/>
                        </div> -->
                    </div>
                    <form id="fincode-form">
                        <div id="fincode">
                        </div>
                        
                        <div class="errors">

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script>
    import AdminLayout from '../../Layout/Admin.vue';
    import { IonCheckbox } from '@ionic/vue';
    
    export default {
        components: {
            AdminLayout, IonCheckbox
        },

        setup() {
            document.title = 'ポイントを購入する - とれとれガチャステーション';
        },

        data() {

        }
    }

    
</script>