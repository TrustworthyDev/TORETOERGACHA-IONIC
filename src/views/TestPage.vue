<template class="">
    <div class="w-full h-full bg-white flex flex-col">
        <div class="md:w-[760px] w-full mx-auto md:px-0 px-2 md:py-0 py-2">
            <Header />
            <Signin />
            <Footer />
        </div>
    </div>
</template>

<script>

import Header from './layout/Header.vue';
import Signin from './auth/signin.vue';
import Footer from './layout/Footer.vue';

export default {
    components: {
        Header,
        Signin,
        Footer
    },

    data() {
        return {
            value : ''
        }
        
    },

    methods: {
       
    },

    mounted() {

    },
}

</script>