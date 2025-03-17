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
                            <img :src="image" class="card-img-top" alt="Preview" />
                            <div class="card-body" style="display: flex; justify-content: space-around">
                                <p class="btn btn-danger btn-sm" @click="removeImage(index)">
                                    {{ lang?.gallerydetailpage?.bottoms?.delete }}
                                </p>
                                <a :href="image" :download class="btn btn-primary btn-sm"> {{ lang?.gallerydetailpage?.bottoms?.download }}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ lang?.gallerydetailpage?.titles?.main }}</h5>
                            <div class="my-2" v-if="isAdmin">
                                <div class="mb-3">
                                    <label for="title" class="form-label">{{ lang?.gallerydetailpage?.titles?.description }}</label>
                                    <input v-model="gallery.description" type="text" class="form-control"
                                        id="description" />
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">{{ lang?.gallerydetailpage?.titles?.year }} </label>
                                    <input v-model="gallery.year" type="number" class="form-control" id="year" />
                                </div>
                                <button class="btn btn-success ms-3" @click="saveChanges">{{ lang?.gallerydetailpage?.bottoms?.save }}</button>
                                <button @click="goToPage('/admin/add-gallery')" class="btn btn-secondary">
                                    {{ lang?.gallerydetailpage?.bottoms?.goGallery }}
                                </button>
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
const PAGE = 'gallerydetailpage'
const infModal = ref({})
const gallery = ref({})
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
        description: gallery.value.description,
        year: gallery.value.year,
        images: [],
        trashImages: trashImages.value
    }

    console.log(newGallery)
    try {
        const res = await updateGallery(newGallery)

        if (res && res.status) {
            showNotify(res.message, 'Galería actualizada con éxito')

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

.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>
