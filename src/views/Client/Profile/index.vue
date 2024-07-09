<script setup>
    import { useStore } from 'vuex';
    import { IonContent } from '@ionic/vue';

    import AdminLayout from '../../Layout/Admin.vue';
    import InviteFriend from './Partials/InviteFriend.vue';
    // import DeleteUserForm from './Partials/DeleteUserForm.vue';
    import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
    import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
    // import { Head } from '@inertiajs/inertia-vue3';

    defineProps({
        mustVerifyEmail: Boolean,
        status: Boolean,
        invitations: Object,
    });
    
    document.title = "プロフィール";
    
</script>

<template>
    <ion-content>
        <AdminLayout>
            <div class="w-full flex justify-center pt-4 font-sans overflow-y-auto">
                <div class="md:w-[760px] w-full ">
                    <h2 class="font-semibold text-lg leading-tight px-4">
                        プロフィール
                    </h2>
                    <div class="w-full py-4">
                        <div class="mx-auto px-2 md:px-6 lg:px-8 space-y-6">
                            <div class="p-4 sm:p-8 border shadow rounded-lg">
                                <InviteFriend :invitations="invitations" />
                            </div>
                            <div class="p-4 sm:p-8 border shadow rounded-lg">
                                <UpdateProfileInformationForm
                                    :must-verify-email="mustVerifyEmail"
                                    :status="status"
                                />
                            </div>

                            <div class="p-4 sm:p-8 border shadow rounded-lg">
                                <UpdatePasswordForm  />
                            </div>

                            <!-- <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <DeleteUserForm  />
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    </ion-content>
</template>
