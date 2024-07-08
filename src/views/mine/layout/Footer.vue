<template>
    <div class="w-full mx-auto pt-5 md:px-2 px-4 items-start bottom-0 inset-x-0 text-black">
        <div class="w-full flex text-center flex-wrap items-center md:px-2 px-4 pb-2 md:gap-20 justify-center">
            <a href="/" class="text-inherit-400 text-center md:w-auto w-[100%]">利用規約</a>
            <a href="/" class="text-inherit-400 text-center md:w-auto w-[100%]">プライバシーポリシー</a>
            <a href="/" class="text-inherit-400 text-center md:w-auto w-[100%]">特定商取引法に基づく表記</a>
        </div>
        <hr class="border-black"></hr>
        <div class="flex justify-center pt-1 pb-5 md:px-2 px-4">
            <span class="text-inherit-1000 text-sm font-semibold mr-3">とれとれガチャステーション</span>
            <span class="text-inherit-400 text-sm">© {{ year }} all rights reserved</span>
        </div>
    </div>

</template>

<script>

export default {

    data() {
        return {
            year: new Date().getFullYear()
        }
    }
    
}
    

</script>