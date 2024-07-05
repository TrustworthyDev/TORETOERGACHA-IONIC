<template>
    <div class="w-full min-h-full text-black text-neutral-700">
        <div class="w-full text-center pt-6 md:px-16 px-4">
            <h1 class="underline underline-offset-[12px] mb-10 text-center text-xl font-bold">
                &nbsp;&nbsp;&nbsp;ログイン&nbsp;&nbsp;&nbsp;
            </h1>
        </div>
        <div class="w-full md:px-16 px-4 md:mx-0">
            <div class="w-full mb-4">
                <label for="email" class="block text-md font-bold p-2">メールアドレス</label>
                <input 
                    type="email" 
                    name="email"
                    class="w-full rounded-md px-4 py-3 shadow-xs outline-none bg-white border-solid border-[1px] border-neutral-300" 
                    
                />
            </div>
            <div class="w-full mb-8">
                <label for="password" class="block text-md font-bold p-2">パスワード</label>
                <input 
                    type="password"
                    name="password" 
                    class="w-full rounded-md px-4 py-3 shadow-xs outline-none bg-white border-solid border-[1px] border-neutral-300"
                    placeholder="半角英数字6～20文字"
                />      
            </div>
            <div class="w-full mb-8">
                <ion-checkbox 
                    style="--size: 20px; --checkbox-background-checked: #60493d; --border-color: #60493d; --border-color-checked: #60493d; --checkbox-background: #ffffff"
                    class="text-md font-bold bg-white" label-placement="end"
                >
                    パスワードを表示
                </ion-checkbox>
            </div>
            <div class="w-full flex justify-center">
                <button 
                    type="submit" 
                    :class="{ 'opacity-25': processing }" :disabled="processing"
                    class="inline-block items-center px-10 py-1.5 bg-[#60493d] hover:bg-[#896858] font-semibold text-md text-white uppercase tracking-widest"
                >
                    ログイン
                </button>
            </div>
            <div class="w-full flex justify-center mt-12 flex-wrap">
                <a
                    class="text-md underline underline-offset-[4px] mr-2 md:w-auto w-full"
                >
                    パスワードをお忘れの方はこちら
                </a>
                <a 
                    class="text-md underline underline-offset-[4px] ml-2 md:w-auto w-full">
                    新規会員登録はこちら
                </a>
            </div>
        </div>
    </div>

</template>

<script>
    import { IonCheckbox } from '@ionic/vue';


</script>
