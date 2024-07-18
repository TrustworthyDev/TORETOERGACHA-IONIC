<template>
    <Head title="決済" />
    <AdminLayout>
        <div class="m-3 px-3 pt-0 text-center h-[400px] rounded-md">
            <div class="mt-8 mb-8 text-center">
                処理中です。
            </div>
        </div>
    </AdminLayout>
</template>

<script>
import { Head, useForm, Link } from '@inertiajs/inertia-vue3';
import AdminLayout from '@/Layouts/Admin.vue';


export default {
    components: { Head, AdminLayout, Link },
    props: {
        errors: Object,
        auth: Object,
        checkout: Object,
    },
    created() {
        document.title = "決済";
    },
    mounted() {
        window.location.replace(this.checkout.url);
    },
}
</script>