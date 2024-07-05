<template>
    <div class="w-full min-h-full text-black text-neutral-700">
        <div class="w-full text-center pt-6 md:px-16 px-4 py-2">
            <h1 class="underline underline-offset-[12px] mb-10 text-center text-xl font-bold">
                &nbsp;&nbsp;&nbsp;ログイン&nbsp;&nbsp;&nbsp;
            </h1>
        </div>
        <div class="w-full md:px-16 px-4 md:mx-0">
            <div class="w-full mb-4">
                <label for="email" class="block text-md font-bold p-2">メールアドレス</label>
                <input 
                    type="text" 
                    class="w-full rounded-md px-4 py-3 shadow-xs outline-none bg-white border-solid border-2 border-neutral-300" 

                />
            </div>
            <div class="w-full">
                <label for="password" class="block text-md font-bold p-2">パスワード</label>
                <input 
                    type="text" 
                    class="w-full rounded-md px-4 py-3 shadow-xs outline-none bg-white border-solid border-2 border-neutral-300" 
                />
            </div>
        </div>
        <div class="w-full">
            <ion-checkbox></ion-checkbox>
        </div>
    </div>

</template>

<script>
import { IonCheckbox } from '@ionic/vue';


</script>