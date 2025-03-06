<template>
    <div class="event-detail my-5">
        <div class="banner text-center py-5 mb-5">
            <h1 class="display-4 text-white">{{ event.title }}</h1>
            <p class="lead text-white">{{ event.date }}</p>
        </div>
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-8">
                    <img :src="event.image" class="d-block w-100" alt="Imagen del evento">
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ lang?.eventpage?.titles?.main }}</h5>
                            <p class="card-text"><strong>{{ lang?.eventpage?.titles?.date }}:</strong> {{ event.date }}
                            </p>
                            <div class="my-2" v-if="isAdmin">
                                <button class="btn btn-secondary" @click="goToPage('/admin/event-list')">{{
                                    lang?.eventpage?.actions?.listAdmin }}</button>
                                <button class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#editEventModal">{{ lang?.eventpage?.actions?.edit }}</button>
                                <button class="btn btn-danger ms-3" @click="modalDelete">{{
                                    lang?.eventpage?.actions?.delete }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12">
                    <h2>{{ lang?.eventpage?.titles?.description }}</h2>
                    <p>{{ event.description }}</p>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-12 text-center">
                    <button @click="goToPage('/events')"
                        class="btn btn-secondary">{{ lang?.eventpage?.actions?.list }}</button>
                </div>
            </div>
        </div>
    </div>
    <BaseModal v-if="isAdmin" :title="modalDeleteInfo.title" :body="modalDeleteInfo.body"
        :closeText="modalDeleteInfo.closeText" :acceptText="modalDeleteInfo.acceptText"
        :onAccept="modalDeleteInfo.onAccept" colorAcceptButton="danger" />

    <div class="modal fade" id="editEventModal" tabindex="-1" aria-labelledby="editEventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editEventModalLabel">{{ lang?.eventpage?.editModal?.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editEvent" class="needs-validation" novalidate>
                        <div class="mb-3 text-center">
                            <img :src="imagePresent || event.image" class="img-thumbnail" alt="Imagen actual del evento"
                                width="150">
                        </div>
                        <div class="mb-3">
                            <label for="title" class="form-label">{{ lang?.eventpage?.editModal?.titleEvent }}</label>
                            <input v-model="event.title" type="text" class="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">{{ lang?.eventpage?.editModal?.description
                                }}</label>
                            <textarea v-model="event.description" class="form-control" id="description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">{{ lang?.eventaddpage?.titles?.type ?? '' }}</label>
                            <select v-model="event.type" class="form-select" id="type" required>
                                <option value="family">{{ lang?.eventaddpage?.options?.family ?? '' }}</option>
                                <option value="cultural">{{ lang?.eventaddpage?.options?.cultural ?? '' }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">{{ lang?.eventpage?.editModal?.image }}</label>
                            <input type="file" class="form-control" id="image" @change="handleImageUpload"
                                accept="image/*" />
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                {{ isLoading ? lang?.eventpage?.editModal?.saving : lang?.eventpage?.editModal?.save }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseModal from '@/components/modals/BaseModal.vue';
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { format } from '@formkit/tempo';
import { Modal } from 'bootstrap';
import { deleteEvent, updateEvent } from '@/services/EventService';
import { isUserLoggedAdmin } from '@/utils/Validations';
import { getConfig, getLangForPage } from '@/config/BasicConfig';

const router = useRouter();

const isAdmin = ref(false);

const event = ref({});
const lang = ref({});
const PAGE = 'eventpage';
const infModal = ref({});
const previewImage = ref(null);
const imagePresent = ref(null);
const isLoading = ref(false);
const date = ref(null);



const modalDelete = () => {
    const myModal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop'));
    myModal.show();
}

const modalDeleteInfo = ref({
    title: infModal.value.title,
    body: infModal.value.message,
    closeText: infModal.value.cancel,
    acceptText: infModal.value.delete,
    onAccept: async () => {
        if (!isAdmin.value) return;
        await deleteEvent(event.value._id);
        router.push('/events');
    }
});

function goToPage(url) {
    router.push(url);
}

watchEffect(() => {
    if (infModal.value) {
        modalDeleteInfo.value.title = infModal.value.title;
        modalDeleteInfo.value.body = infModal.value.message;
        modalDeleteInfo.value.closeText = infModal.value.cancel;
        modalDeleteInfo.value.acceptText = infModal.value.delete;

    }
});

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        previewImage.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePresent.value = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

const closeModalEdit = () => {
    Modal.getOrCreateInstance(document.getElementById('editEventModal')).hide();
};

const editEvent = async () => {
    try {
        isLoading.value = true;
        const editedEvent = {
            id: event.value._id,
            title: event.value.title,
            type: event.value.type,
            date: date.value,
            description: event.value.description,
            image: event.value.image,
            newImage: previewImage.value || null
        };
        await updateEvent(editedEvent);
        setTimeout(() => {
            isLoading.value = false;
            closeModalEdit();
            if (previewImage.value)
                event.value.image = imagePresent.value;
            sessionStorage.setItem('event', JSON.stringify(event.value));
            imagePresent.value = null;
        }, 1500);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
    }
};

onMounted(async () => {
    isAdmin.value = isUserLoggedAdmin();
    const item = sessionStorage.getItem('event');
    if (!item) router.push('/events');

    const objItem = JSON.parse(item); //objItem.date = objItem.date.replace('Z', ''); // <-- Esto es para quitar la Z del final de la fecha, si no se quita le quita un día a la fecha


    
    date.value = new Date(objItem.date.replace('Z', '')).toISOString().slice(0, -1);
    objItem.date = format(new Date(objItem.date.replace('Z', '')), { date: "full" }, getConfig().CURRENT_LANG);
    event.value = objItem;

    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
        infModal.value = lang.value.eventpage.modal;
    }).catch(() => {
        router.go(0);
    });

});
</script>

<style scoped>
.event-detail {
    /* background-color: #f8f9fa; */
    background-color: var(--background-color-3);
    min-height: 100vh;
}

.banner {
    /* background: linear-gradient(45deg, #ff6b6b, #4ecdc4); */
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    margin-bottom: 2rem;
}

.carousel-item img {
    height: 400px;
    object-fit: cover;
}

.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.list-group-item {
    border-left: none;
    border-right: none;
}

.list-group-item:first-child {
    border-top: none;
}

.list-group-item:last-child {
    border-bottom: none;
}

h2,
h3 {
    /* color: #333; */
    color: var(--text-color-3);
    margin-bottom: 1rem;
}

.btn-primary {
    /*  background-color: #4ecdc4;
    border-color: #4ecdc4; */
    background-color: var(--primary-color);
    border-color: var(--decorative-color);
}

.btn-primary:hover {
    /* background-color: #45b7ae;
    border-color: #45b7ae; */
    background-color: var(--primary-color);
    border-color: var(--decorative-color);
}

.btn-secondary {
    /* background-color: #ff6b6b;
    border-color: #ff6b6b; */
    background-color: var(--primary-color);
    border-color: var(--decorative-color);
    transition: transform 0.2s ease-in-out;
}

.btn-secondary:hover {
    /*  background-color: #ff5252;
    border-color: #ff5252; */
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
    background-color: var(--decorative-color);
    border-color: var(--decorative-color);
}
</style>