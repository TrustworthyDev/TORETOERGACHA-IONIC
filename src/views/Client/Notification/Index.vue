<template>
    <AdminLayout>
        <div>
            <div class="py-2">
                <input 
                    class="bg-white border-[2px] rounded-md border-slate-[500] w-full leading-8 py-1 px-3 text-lg outline-none"
                    v-model="title"
                />
            </div>
            <div class="py-2">
                <textarea
                    class="bg-white border-[2px] rounded-md border-slate-[500] md:w-full md:min-h-80 py-3 px-3 text-lg outline-none"
                    v-model="content"
                ></textarea>
            </div>
            <div class="flex justify-center">
                <button 
                    type="button" 
                    class="w-36 inline-block items-center px-1 py-2.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-cyan-700 focus:outline-none focus:border-cyan-700 focus:shadow-outline-cyan transition ease-in-out duration-150 m-1 hover:bg-[#896858] bg-[#60493d]"
                    @click="sendPushNotificatioin"
                >
                    Send
                </button>
            </div>
        </div>
    </AdminLayout>

</template>

<script>
    import axios from 'axios';
    import AdminLayout from '../../Layout/Admin.vue';

    export default {
        components: {
            AdminLayout
        },
        data() {
            return {
                title: '',
                content: ''
            }
        },
        methods: {
            sendPushNotificatioin(){
                axios.post(`api/notify`, {
                    title: this.title,
                    content: this.content
                })
            }
        }
    }

</script>