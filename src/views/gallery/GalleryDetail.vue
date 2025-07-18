<template>
    <div class="event-detail my-5">
        <div class="banner text-center py-5 mb-5">
            <h1 class="display-4 text-white">{{ gallery.description }}</h1>
            <p class="lead text-white">{{ gallery.year }}</p>
        </div>
        <div class="container">
            <div class="row mb-5">
                <div class="row g-3 px-sm-md-2">
                    <div v-for="(image, index) in images" :key="index" class="col-md-4 col-sm-6">
                        <div class="card h-100">
                            <img :src="image" class="card-image rounded" alt="Preview" />
                            <div class="card-body">
                                <div class="d-flex justify-content-end">
                                    <p class="btn btn-danger btn-sm d-flex align-items-center me-1"
                                        @click="removeImage(index)" style="height: 40px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                            width="24px" fill="#e3e3e3">
                                            <path
                                                d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z" />
                                        </svg>
                                    </p>
                                    <a :href="image" :download class="btn btn-primary btn-sm  d-flex align-items-center"
                                        role="button" style="height: 40px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                            width="24px" fill="#e3e3e3">
                                            <path
                                                d="M480-328.46 309.23-499.23l42.16-43.38L450-444v-336h60v336l98.61-98.61 42.16 43.38L480-328.46ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z" />
                                        </svg>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5"></div>

            <div class="row mt-5">
                <div class="col-12 text-center"></div>
            </div>
        </div>
        <div class="text-center py-5 mb-5">
            <div class="d-flex justify-content-center">
                <div class="card" ref="imageCard">
                    <div class="card-body">
                        <h5 class="card-title">{{ lang?.gallerydetailpage?.titles?.main }}</h5>
                        <div class="my-2" v-if="isAdmin">
                            <div class="mb-3">
                                <label for="title" class="form-label">{{
                                    lang?.gallerydetailpage?.titles?.description
                                    }}</label>
                                <input v-model="updatedGallerys.description" type="text" class="form-control"
                                    id="description" />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">{{ lang?.gallerydetailpage?.titles?.year
                                    }}
                                </label>
                                <input v-model="updatedGallerys.year" type="number" class="form-control" id="year" />
                            </div>
                            <button class="btn btn-primary" @click="saveChanges">{{
                                lang?.gallerydetailpage?.bottoms?.save }}</button>
                            <button @click="goToPage('/admin/add-gallery')" class="btn btn-secondary">
                                {{ lang?.gallerydetailpage?.bottoms?.goGallery }}
                            </button>
                        </div>
                    </div>
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
                    <h5 class="modal-title" id="editEventModalLabel">
                        {{ lang?.eventpage?.editModal?.title }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editEvent" class="needs-validation" novalidate></form>
                </div>
            </div>
        </div>
    </div>
    <NotificationToast v-bind:header="notify.header" v-bind:body="notify.body" />
    <LoadingModal idModal="load" />
</template>

<script setup>
import BaseModal from '@/components/modals/BaseModal.vue'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { getConfig, getLangForPage } from '@/config/BasicConfig'
import NotificationToast from '@/components/toasts/NotificationToast.vue'
import LoadingModal from '@/components/modals/LoadingModal.vue'
import { Toast } from 'bootstrap'
import { updateGallery } from '@/services/GalleryService'

const router = useRouter()

const isAdmin = ref(false)

const lang = ref({})
const imageCard = ref();
const PAGE = 'gallerydetailpage'
const infModal = ref({})
const gallery = ref({})
const updatedGallerys = ref({
    description: '',
    year: 0
})
const images = ref([])
const trashImages = ref([])
const numImages = ref(0)
const notify = ref({ header: '', body: '' })
const removeImage = (index) => {
    numImages.value = index
    modalDelete()
}

const modalDelete = () => {
    const myModal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop'))
    myModal.show()
}

const modalDeleteInfo = ref({
    title: infModal.value.title,
    body: infModal.value.message,
    closeText: infModal.value.cancel,
    acceptText: infModal.value.delete,
    onAccept: async () => {
        trashImages.value.push(images.value[numImages.value])
        gallery.value.images.splice(numImages.value, 1)
    }
})

function goToPage(url) {
    router.push(url)
}

const showNotify = (header, body) => {
    notify.value.header = header
    notify.value.body = body

    const toastLive = document.getElementById('liveToast')
    const toastBootstrap = Toast.getOrCreateInstance(toastLive)
    toastBootstrap.show()
}

const modalLoading = () => {
    const myModal = Modal.getOrCreateInstance(document.getElementById('load'))
    myModal.show()
}

const saveChanges = async () => {
    modalLoading()
    const newGallery = {
        id: gallery.value._id,
        description: updatedGallerys.value.description,
        year: Number(updatedGallerys.value.year),
        images: [],
        trashImages: trashImages.value
    }

    console.log(newGallery)
    try {
        const res = await updateGallery(newGallery)

        if (res && res.status) {
            showNotify(res.message, 'Galería actualizada con éxito')

            gallery.value.description = updatedGallerys.value.description
            gallery.value.year = updatedGallerys.value.year
            sessionStorage.setItem('gallery', JSON.stringify(gallery.value));


            setTimeout(() => {
                router.go(0)
            }, 1500)
            return true
        } else {
            showNotify(res ? res.message : 'No se pudo crear la galería')
            return false
        }
    } catch (error) {
        console.error('Error al crear la galería:', error)
        showNotify('Error al crear la galería')
        return false
    }
}

watchEffect(() => {
    if (infModal.value) {
        modalDeleteInfo.value.title = infModal.value.title;
        modalDeleteInfo.value.body = infModal.value.message;
        modalDeleteInfo.value.closeText = infModal.value.cancel;
        modalDeleteInfo.value.acceptText = infModal.value.delete;

    }
});

onMounted(async () => {
    isAdmin.value = isUserLoggedAdmin()
    const item = sessionStorage.getItem('gallery')
    if (!item) router.push('/admin/add-gallery')

    gallery.value = JSON.parse(item)

    images.value = gallery.value.images
    updatedGallerys.value.description = gallery.value.description
    updatedGallerys.value.year = gallery.value.year
    await getLangForPage(getConfig().CURRENT_LANG, PAGE)
        .then((data) => {
            lang.value = data
            infModal.value = lang.value.gallerydetailpage.modal
        })
        .catch(() => {
            router.go(0)
        })
})

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



/* Grid de Imágenes */
.row.mb-5 {
  margin-bottom: 4rem !important;
}

.row.g-3 {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
}

.col-md-4,
.col-sm-6 {
  display: flex;
  align-items: stretch;
}

/* Cards de Imagen */
.card {
  border: none;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.card.h-100 {
  height: 100%;
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.4s ease;
}

.card-image:hover {
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
  background: var(--background-color-4);
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.card-title{
    font-family: var(--text-font-1);
    font-weight: 700;
    color: var(--text-color-2);
    margin-bottom: 1rem;
    text-align: center;
}

/* Botones de Acción en Cards */
.d-flex.justify-content-end {
  gap: 0.5rem;
}

.btn {
  font-family: var(--text-font-1);
  font-weight: 600;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-sm {
  padding: 8px 12px;
  font-size: 0.8rem;
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

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #5a6268, #495057);
}

/* SVG en botones */
.btn svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Card Principal de Información */
.banner .card {
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.banner .card-body {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
}

.banner .card-title {
  color: var(--text-color-2);
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  text-align: center;
}

.banner .card-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  border-radius: 2px;
}

/* Formulario de Edición */
.form-label {
  color: var(--text-color-2);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.my-2 {
  margin: 1.5rem 0;
}

.my-2 .btn {
  padding: 12px 24px;
  font-size: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
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

.btn-close {
  filter: brightness(0) invert(1);
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
  
  .row.g-3 {
    --bs-gutter-x: 1rem;
    --bs-gutter-y: 1rem;
  }
  
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .col-sm-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
  .card-image {
    height: 200px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .banner .card-body {
    padding: 1.5rem;
  }
  
  .my-2 .btn {
    width: 100%;
    margin-bottom: 0.5rem;
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
  
  .col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .card-image {
    height: 180px;
  }
  
  .card-body {
    padding: 0.8rem;
  }
  
  .banner .card-body {
    padding: 1rem;
  }
  
  .d-flex.justify-content-end {
    justify-content: center !important;
  }
  
  .btn-sm {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
  
  .btn svg {
    width: 16px;
    height: 16px;
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

.form-control:focus-visible {
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

/* Espaciado adicional */
.px-sm-md-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media (min-width: 576px) {
  .px-sm-md-2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Estilos específicos para altura de botones */
.btn[style*="height: 40px"] {
  min-height: 40px;
  height: 40px;
}

/* Mejoras para los enlaces de descarga */
a.btn {
  text-decoration: none;
}

a.btn:hover {
  text-decoration: none;
}

/* Espaciado entre botones */
.me-1 {
  margin-right: 0.25rem;
}

.ms-3 {
  margin-left: 1rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.mt-5 {
  margin-top: 3rem;
}

.mb-5 {
  margin-bottom: 3rem;
}

.py-5 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-end {
  justify-content: flex-end;
}

.align-items-center {
  align-items: center;
}

.rounded {
  border-radius: 0.375rem;
}

.h-100 {
  height: 100%;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}
</style>
