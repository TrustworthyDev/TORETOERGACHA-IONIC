<template>
    <Head title="ポイント購入完了" />

    <AdminLayout>
        <div class="pt-6 md:px-2 px-4" style="min-height:400px;">
            <h1 class="mb-2 text-lg font-bold">ポイント購入完了</h1>
            <hr class="mb-8" />
        
            <div  class="pt-4 mb-4 text-sm text-center">
                購入は完了しました。<br/>
                購入ページに
            </div>
            <div  class="text-center">
                <a href="/point" class="inline-flex items-center px-16 py-2.5 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 active:bg-red-800 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"> リダイレクトする </a>
            </div>
        </div>

    </AdminLayout>
</template>

<script>
import AdminLayout from '../../Layout/Admin.vue';

export default {
    components: {AdminLayout},
    
    setup() {
        document.title = 'ポイント購入完了';
    }
}
</script>