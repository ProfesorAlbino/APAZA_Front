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
                                <button class="btn btn-danger " @click="modalDelete">{{
                                    lang?.eventpage?.actions?.delete }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12">
                    <h2 class="ev-detail">{{ lang?.eventpage?.titles?.description }}</h2>
                    <p class="ev-detail">{{ event.description }}</p>
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
                            <input v-model="updateEvents.title" type="text" class="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">{{ lang?.eventpage?.editModal?.description
                                }}</label>
                            <textarea v-model="updateEvents.description" class="form-control" id="description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">{{ lang?.eventaddpage?.titles?.type ?? '' }}</label>
                            <select v-model="updateEvents.type" class="form-select" id="type" required>
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
const updateEvents = ref({
    title: "",
    description: "",
    type: ""
});
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
            title: updateEvents.value.title,
            type: updateEvents.value.type,
            date: date.value,
            description: updateEvents.value.description,
            image: event.value.image,
            newImage: previewImage.value || null
        };
        await updateEvent(editedEvent);
        setTimeout(() => {
            isLoading.value = false;
            closeModalEdit();
            if (previewImage.value)
                event.value.image = imagePresent.value;
            event.value.title = updateEvents.value.title;
            event.value.description = updateEvents.value.description;
            event.value.type = updateEvents.value.type;
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
    updateEvents.value.title = event.value.title;
    updateEvents.value.description = event.value.description;
    updateEvents.value.type = event.value.type;

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
  font-family: var(--text-font-1);
  background: linear-gradient(135deg, var(--background-color-3) 0%, var(--background-color) 100%);
  min-height: 100vh;
}

/* Banner Hero Section */
.banner {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  position: relative;
  overflow: hidden;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.banner .display-4 {
  font-family: var(--text-font-1);
  font-weight: 800;
  color: var(--text-color-1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

.banner .lead {
  color: var(--text-color-1);
  font-size: 1.3rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

/* Container Principal */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Sección de Imagen y Detalles */
.row.mb-5 {
  margin-bottom: 4rem !important;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.col-md-8 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-md-8 img {
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  width: 100%;
  height: auto;
  max-width: 500px;
  object-fit: cover;
  animation: fadeInLeft 0.8s ease-out;
}

.col-md-8 img:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

/* Card de Información */
.card {
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInRight 0.8s ease-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 2.5rem;
    background: var(--background-color-4);
    border-radius: 20px;
}

.card-title {
  color: var(--text-color-2);
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  border-radius: 2px;
}

.card-text {
  color: var(--text-color-3);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-text strong {
  color: var(--text-color-2);
  font-weight: 600;
}

/* Botones de Administración */
.my-2 {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.btn {
  font-family: var(--text-font-1);
  font-weight: 600;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #5a6268, #495057);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107, #ffb300);
  color: #212529;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #ffb300, #ffa000);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
}

/* Sección de Descripción */
.ev-detail {
  color: var(--text-color-1);
  font-family: var(--text-font-1);
  text-align: center;
}

.ev-detail h2 {
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
}

.ev-detail h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  border-radius: 2px;
}

.ev-detail p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color-3);
  text-align: justify;
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

/* Botón de Volver */
.text-center .btn-secondary {
  padding: 15px 40px;
  font-size: 1.1rem;
  margin-top: 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
}

.text-center .btn-secondary:hover {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  transform: translateY(-3px);
}

/* Modal Styles */
.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.75rem auto;
  max-width: 600px;
}

.modal-content {
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  width: 100%;
}

.modal-body{
      background: var(--background-color-4);
}
.modal-body .text-center {
  margin-bottom: 1.5rem;
}

.modal-body .img-thumbnail {
  display: block;
  margin: 0 auto;
}

.modal-header {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
  border-radius: 20px 20px 0 0;
  border-bottom: none;
}

.modal-title {
  font-family: var(--text-font-1);
  font-weight: 700;
}

.modal-body {
  padding: 2rem;
}

.form-label {
  color: var(--text-color-2);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.img-thumbnail {
  border-radius: 15px;
  border: 3px solid var(--accent-color);
  padding: 5px;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 0 15px;
  }
}

@media (max-width: 768px) {
  .banner {
    padding: 3rem 0;
    border-radius: 0 0 20px 20px;
  }
  
  .banner .display-4 {
    font-size: 2rem;
  }
  
  .banner .lead {
    font-size: 1.1rem;
  }
  
  .row.mb-5 {
    gap: 1.5rem;
    flex-direction: column;
  }
  
  .col-md-4 {
    order: -1;
  }
  
  .col-md-8 {
    order: 1;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .my-2 {
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    min-width: 120px;
  }
  
  .ev-detail h2 {
    font-size: 1.8rem;
  }
  
  .ev-detail p {
    padding: 1.5rem;
    font-size: 1.1rem;
  }
  
  .modal-dialog {
    margin: 1rem auto;
    max-width: 95vw;
  }
}

@media (max-width: 576px) {
  .banner {
    padding: 2rem 0;
  }
  
  .banner .display-4 {
    font-size: 1.8rem;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .my-2 {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .ev-detail p {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .modal-dialog {
    margin: 0.5rem auto;
    max-width: 98vw;
  }
  
  .modal-body {
    padding: 1rem;
  }
}

/* Mejoras de Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible para navegación por teclado */
.btn:focus-visible {
  outline: 3px solid var(--accent-color);
  outline-offset: 2px;
}

.form-control:focus-visible,
.form-select:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Alto contraste */
@media (prefers-contrast: high) {
  .card {
    background: white;
    border: 2px solid #000;
  }
  
  .btn {
    border: 2px solid #000;
  }
}
</style>