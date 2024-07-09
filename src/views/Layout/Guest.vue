<script setup>
import ApplicationLogo from '../components/ApplicationLogo.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
        <div class="min-h-screen w-full flex flex-col">
            <div class="flex-shrink-0 w-full justify-center">
                <div class="flex justify-center px-2 py-1">
                    <div class="md:w-[760px] w-full flex py-1 mx-auto justify-center items-center gap-1">
                        <div class="flex items-center flex-1">
                            <RouterLink :to="{name: 'home'}" class="flex">
                                <img class="mx-auto max-h-12 max-w-full h-30" alt="とれとれガチャステーション"
                                    src="/images/logo.png" />
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden sm:rounded-lg justify-center ">
                        <slot />
                    </div>
                </div>
            </div>
            
        </div>

        
    </div>
</template>
