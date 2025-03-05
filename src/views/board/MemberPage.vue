<template>
    <div class="event-detail my-5 d-flex flex-column align-items-center">
        <div class="banner text-center py-5 mb-5 w-100">
            <h1 class="display-4 text-white">{{ lang?.memberpage?.titles?.main }}</h1>
            
        </div>
        <div class="container d-flex flex-column align-items-center">
            <div class="card shadow-lg p-4 mb-5 text-center" style="max-width: 500px;">
                <img :src="member.photo" class="img-fluid rounded mb-3" alt="Foto del miembro">
                <h1 class="display-5 mt-3">{{ member.name }}</h1>
                <p class="lead">{{ member.role }}</p>
            </div>
            <div v-if="isAdmin" class="card shadow-lg p-4 mb-5 text-center " style="max-width: 300px;">
                <h5 class="card-title">{{ lang?.memberpage?.actions?.main }}</h5>
                <button class="btn btn-secondary" @click="goToPage('/admin/board-list')">{{ lang?.memberpage?.actions?.listAdmin }}</button>
                <button class="btn btn-danger ms-3" @click="modalDelete">{{ lang?.memberpage?.actions?.delete }}</button>
            </div>
            <div class="text-center mt-3">
                <button @click="goToPage('/board')" class="btn btn-custom">{{ lang?.memberpage?.actions?.list }}</button>
            </div>
        </div>
    </div>
    <BaseModal v-if="isAdmin" :title="modalDeleteInfo.title" :body="modalDeleteInfo.body"
        :closeText="modalDeleteInfo.closeText" :acceptText="modalDeleteInfo.acceptText"
        :onAccept="modalDeleteInfo.onAccept" colorAcceptButton="danger" />
</template>

<script setup>
import BaseModal from '@/components/modals/BaseModal.vue';
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import { deleteMember } from '@/services/BoardService';
import { isUserLoggedAdmin } from '@/utils/Validations';
import { getLangForPage, getConfig } from '@/config/BasicConfig';

const router = useRouter();
const isAdmin = ref(false);
const member = ref({});
const PAGE = 'memberpage';
const lang = ref({});
const infModal = ref({});

const modalDelete = () => {
    const myModal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop'));
    myModal.show();
}

onMounted(async () => {
   
});

const modalDeleteInfo = ref({
    title: infModal.value.title,
    body: infModal.value.message,
    closeText: infModal.value.cancel,
    acceptText: infModal.value.delete,
    onAccept: async () => {
        if (!isAdmin.value) return;
        await deleteMember(member.value._id);
        router.push('/board');
    }
});

function goToPage(url) {
    router.push(url);
}

// Observa los cambios en `infModal` y actualiza `modalDeleteInfo`
watchEffect(() => {
    if (infModal.value) {
        modalDeleteInfo.value.title = infModal.value.title;
        modalDeleteInfo.value.body = infModal.value.message;
        modalDeleteInfo.value.closeText = infModal.value.cancel;
        modalDeleteInfo.value.acceptText = infModal.value.delete;

    }
});

onMounted(async() => {
    isAdmin.value = isUserLoggedAdmin();
    const item = sessionStorage.getItem('member');
    if (!item) router.push('/board');
    member.value = JSON.parse(item);

    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
        infModal.value = lang.value.memberpage.modal;
    }).catch(() => {
        router.go(0);
    });
});
</script>

<style scoped>
.event-detail {
    background-color: var(--background-color-3);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.banner {
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    width: 100%;
    height: 150px;
}

.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-custom {
    background-color: var(--primary-color);
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 25px;
    transition: transform 0.2s ease-in-out, background-color 0.2s;
}

.btn-custom:hover {
    background-color: var(--decorative-color);
    transform: scale(1.1);
}
</style>
