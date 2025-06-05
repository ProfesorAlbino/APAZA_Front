<script setup>
import CardAdmin from '@/components/cards/CardAdmin.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { addGallery, deleteGallery, getGallery, updateGallery } from '@/services/GalleryService'
import { getLangForPage, getConfig } from '@/config/BasicConfig'
import router from '@/router'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { Modal, Toast } from 'bootstrap'
import LoadingModal from '@/components/modals/LoadingModal.vue'
import NotificationToast from '@/components/toasts/NotificationToast.vue'
import BaseModal from '@/components/modals/BaseModal.vue'
import AddPhoto from '@/assets/AddPhoto.json'
import CreateAlbum from '@/assets/create-album.json'
import UpdateAlbum from '@/assets/update-album.json'

const num = ref(0)
const isAdmin = ref(false)
const lang = ref({})
const PAGE = 'galleryadminpage'
const albums = ref([])
const modal = ref(null)
const infModal = ref({});

// Galería y Notificaciones
const gallery = ref({ description: '', year: '', images: [] })
const updatedGallery = ref({ description: '', year: '', images: [] })
const notify = ref({ header: '', body: '' })
const dragImages = ref([])
const images = ref([])
const isDragging = ref(false)
const selectedAlbum = ref(null)


const configPagination = {
  page: 0,
  totalPages: 0,
  totalItems: 0
}

const updateNum = (value) => {
  num.value = value
}


// Obtener configuración del idioma
onMounted(async () => {
  isAdmin.value = isUserLoggedAdmin()
  await getLangForPage(getConfig().CURRENT_LANG, PAGE)
    .then((data) => {
      lang.value = data
      infModal.value = lang.value.galleryadminpage.modal;
    })
    .catch(() => { router.go(0) })


  modal.value = new Modal(document.getElementById('albumModal'))
})

// Manejo de archivos
const handleDrop = (e) => {
  isDragging.value = false
  processFiles(e.dataTransfer.files)
}

const handleFileSelect = (e) => {
  processFiles(e.target.files)
}

const processFiles = (files) => {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      dragImages.value.push(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        images.value.push({
          name: file.name,
          url: e.target.result,
          file
        })
      }
      reader.readAsDataURL(file)
    }
  }
}

const removeImage = (index) => {
  images.value.splice(index, 1)
  dragImages.value.splice(index, 1)
}

// Crear galería
const createGallery = async () => {
  modalLoading()

  try {
    gallery.value.images = dragImages.value
    const res = await addGallery(gallery.value)

    if (res && res.status) {
      showNotify(res.message, 'Galería creada con éxito')

      // Resetear la galería
      gallery.value = { description: '', year: '', images: [] }
      dragImages.value = []
      images.value = []
      document.querySelector('form').classList.remove('was-validated')

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

// Llamar a createGallery desde un botón
const pushGallery = async () => {
  const isCreated = await createGallery()
  if (isCreated) images.value = []
}

// Mostrar modal de carga
const modalLoading = () => {
  const myModal = Modal.getOrCreateInstance(document.getElementById('load'))
  myModal.show()
}

// Mostrar notificaciones
const showNotify = (header, body) => {
  notify.value.header = header
  notify.value.body = body

  const toastLive = document.getElementById('liveToast')
  const toastBootstrap = Toast.getOrCreateInstance(toastLive)
  toastBootstrap.show()
}

// Obtener galerías
const getGallerys = async (page, num) => {
  try {
    const res = await getGallery(page)
    if (res && res.status) {
      albums.value = res.data.data.data
      updateNum(num)
      configPagination.page = parseInt(res.data.data.page, 10);
      configPagination.totalPages = res.data.data.totalPages
      configPagination.totalItems = res.data.data.totalItems

    } else {
      showNotify(res ? res.message : 'No se pudo obtener la galería')
    }
  } catch (error) {
    console.error('Error al obtener la galería:', error)
    showNotify('Error al obtener la galería')
  }
}


const deleteAlbum = async (albumId) => {
  gallery.value = albums.value.find((album) => album._id === albumId);
  modalDelete();
}

const viewAlbum = (albumId) => {
  updatedGallery.value = albums.value.find((album) => album._id === albumId);
  sessionStorage.setItem('gallery', JSON.stringify(updatedGallery.value));
  router.push('/admin/gallery-detail');
}

const changePage = (page) => {
  getGallerys(page);
}

const modalDeleteInfo = ref({
  title: infModal.value.title,
  body: infModal.value.message,
  closeText: infModal.value.cancel,
  acceptText: infModal.value.delete,
  onAccept: async () => {
    await deleteGallery(gallery.value._id);
    await getGallerys(configPagination.page);
    gallery.value = {};
  }
});

watchEffect(() => {
  if (infModal.value) {
    modalDeleteInfo.value.title = infModal.value.title;
    modalDeleteInfo.value.body = infModal.value.message;
    modalDeleteInfo.value.closeText = infModal.value.cancel;
    modalDeleteInfo.value.acceptText = infModal.value.delete;

  }
});

const modalDelete = () => {
  const myModal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop'));
  myModal.show();
}

const openModal = (album) => {
  selectedAlbum.value = album
}

const closeModal = () => {
  images.value = []
  modal.value.hide() // Cierra el modal manualmente
}

const saveChanges = async () => {
  modalLoading()
  const newGallery = {
    id: selectedAlbum.value._id,
    description: selectedAlbum.value.description,
    year: selectedAlbum.value.year,
    images: dragImages.value,
    trashImages: []
  }


  try {
    const res = await updateGallery(newGallery)

    if (res && res.status) {
      showNotify(res.message, 'imagenes agregadas con éxito')

      dragImages.value = []
      images.value = []
      closeModal()


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

</script>

<template>
  <div class="container">
    <div v-if="charge" class="m-5 p-5 d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="ms-3 fs-4">{{ lang?.loading }}</p>
    </div>
    <div class="card p-2 p-md-4 mb-2 mb-md-4 shadow">
          <div class="text-center mt-3 shadow p-3 mb-5 bg-body rounded">
      <h1>{{ lang?.galleryadminpage?.titles?.gallery }}</h1>
    </div>

    <div class="row gx-2">
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.createAlbumImages"
          :title="lang?.galleryadminpage?.titles?.addAlbum" @click="updateNum(1)" :icon="CreateAlbum" />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.editDeleteAlbum"
          :title="lang?.galleryadminpage?.titles?.editAlbum" :icon="UpdateAlbum" @click="getGallerys(1, 2)" />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.addImageAlbum"
          :title="lang?.galleryadminpage?.titles?.addImage" :icon="AddPhoto" @click="getGallerys(1, 3)" />
      </div>
    </div>
    </div>

    <div class="row">
      <div class="text-center mt-5 shadow p-3 mb-5 bg-body rounded" v-if="num!= 0">
        <!-- Agregar Imágenes -->
        <div v-if="num == 1" class="col-12">
          <h1>{{ lang?.galleryadminpage?.titles?.addAlbum }}</h1>

          <form class="mt-5" @submit.prevent="pushGallery">
            <div class="row">
              <!-- Campos -->
              <div class="col-6 form-floating">
                <input v-model="gallery.description" type="text" class="form-control" id="floatingDescription"
                  :placeholder="lang?.galleryadminpage?.titles?.description" required />
                <label class="ms-3" for="floatingDescription">{{
                  lang?.galleryadminpage?.titles?.description
                }}</label>
              </div>

              <div class="col-6 form-floating mb-3">
                <input v-model="gallery.year" type="number" class="form-control" id="floatingNumber"
                  :placeholder="lang?.galleryadminpage?.titles?.year" required />
                <label class="ms-3" for="floatingNumber">{{
                  lang?.galleryadminpage?.titles?.year
                }}</label>
              </div>

              <!-- Drop Zone -->
              <div class="drop-zone mb-4 p-5 border rounded d-flex justify-content-center align-items-center"
                @dragover.prevent @drop.prevent="handleDrop" :class="{ 'drag-over': isDragging }"
                @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false">
                <div class="text-center">
                  <i class="bi bi-cloud-upload fs-1"></i>
                  <p class="mb-0">{{ lang?.galleryadminpage?.descriptions?.dropImage }}</p>
                  <label class="btn btn-primary mt-2 btn-label" for="fileInput">
                    {{ lang?.galleryadminpage?.titles?.selectFile }}
                    <input type="file" id="fileInput" multiple accept="image/*" class="d-none"
                      @change="handleFileSelect" />
                  </label>
                </div>
              </div>

              <!-- Imágenes -->
              <div class="row g-3 px-sm-md-2">
                <div v-for="(image, index) in images" :key="index" class="col-md-4 col-sm-6">
                  <div class="card h-100">
                    <img :src="image.url" class="card-img-top" alt="Preview" />
                    <div class="card-body">
                      <p class="card-text">{{ image.name }}</p>
                      <p class="btn btn-danger btn-sm" @click="removeImage(index)">
                        {{ lang?.galleryadminpage?.titles?.delete }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón -->
            <div class="text-center mt-5">
              <button type="submit" class="btn btn-primary btn-submit">
                {{ lang?.galleryadminpage?.titles?.save }}
              </button>
            </div>
          </form>
        </div>

        <!-- Editar Imágenes -->
        <Transition>
          <div v-if="num == 2">
            <h1>{{ lang?.galleryadminpage?.titles?.edit }}</h1>

            <!-- Listado de Álbumes -->
            <div v-for="album in albums" :key="album._id" class="album">
              <h2 class="my-3 me-3">{{ album.description }} ({{ album.year }})</h2>

              <div class="images">
                <img v-for="(img, index) in album.images.slice(0, 5)" :key="index" class="image-card" :src="img"
                  alt="Imagen del álbum" />

                <!-- Contador de imágenes faltantes -->
                <div v-if="album.images.length > 5" class="image-card more-images">
                  +{{ album.images.length - 5 }}
                </div>
              </div>
              <button @click="deleteAlbum(album._id)" class="btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                    d="M292.31-140q-29.83 0-51.07-21.24Q220-182.48 220-212.31V-720h-10q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q197.25-780 210-780h150q0-14.69 10.35-25.04 10.34-10.34 25.03-10.34h169.24q14.69 0 25.03 10.34Q600-794.69 600-780h150q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q762.75-720 750-720h-10v507.69q0 29.83-21.24 51.07Q697.52-140 667.69-140H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q5.39 0 8.85-3.46t3.46-8.85V-720ZM406.17-280q12.75 0 21.37-8.62 8.61-8.63 8.61-21.38v-300q0-12.75-8.63-21.38-8.62-8.62-21.38-8.62-12.75 0-21.37 8.62-8.61 8.63-8.61 21.38v300q0 12.75 8.62 21.38 8.63 8.62 21.39 8.62Zm147.69 0q12.75 0 21.37-8.62 8.61-8.63 8.61-21.38v-300q0-12.75-8.62-21.38-8.63-8.62-21.39-8.62-12.75 0-21.37 8.62-8.61 8.63-8.61 21.38v300q0 12.75 8.63 21.38 8.62 8.62 21.38 8.62ZM280-720v520-520Z" />
                </svg>
              </button>
              <button @click="viewAlbum(album._id)" class="btn-view">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                    d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h274.08q15 0 22.5 9.42 7.5 9.43 7.5 20.58 0 11.15-7.81 20.58-7.81 9.42-22.81 9.42H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-276q0-15 9.42-22.5 9.43-7.5 20.58-7.5 11.15 0 20.58 7.5 9.42 7.5 9.42 22.5v276Q820-182 799-161q-21 21-51.31 21H212.31ZM480-480Zm-100 63.84v-71.22q0-14.47 5.62-27.81 5.61-13.35 15.46-23.19l341.31-341.31q9.3-9.31 20.46-13.58 11.15-4.27 22.69-4.27 11.77 0 22.61 4.27Q819-889 827.92-880.08L878.15-830q8.69 9.31 13.35 20.54 4.65 11.23 4.65 22.77t-3.96 22.38q-3.96 10.85-13.27 20.15L536.46-401.69q-9.85 9.84-23.19 15.77-13.35 5.92-27.81 5.92h-69.3q-15.47 0-25.81-10.35Q380-400.69 380-416.16Zm456.77-370.15-50.23-51.38 50.23 51.38ZM440-440h49.85l249.3-249.31-24.92-24.92-26.69-25.69L440-492.38V-440Zm274.23-274.23-26.69-25.69 26.69 25.69 24.92 24.92-24.92-24.92Z" />
                </svg>
              </button>
            </div>

            <!-- Paginación -->
            <div class="pagination">
              <button @click="changePage(configPagination.page - 1)" :disabled="configPagination.page <= 1"
                class="btn-pagination">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                    d="m127.38-480 301.31 301.31q11.92 11.92 11.62 28.07-.31 16.16-12.23 28.08-11.93 11.92-28.08 11.92t-28.08-11.92L65.08-428.77Q54.23-439.62 49-453.08q-5.23-13.46-5.23-26.92T49-506.92q5.23-13.46 16.08-24.31l306.84-306.85q11.93-11.92 28.39-11.61 16.46.31 28.38 12.23 11.92 11.92 11.92 28.08 0 16.15-11.92 28.07L127.38-480Z" />
                </svg> </button>

              <span>{{ lang?.galleryadminpage.pagination.page }} {{ configPagination.page }} {{
                lang?.galleryadminpage.pagination.of }} {{ configPagination.totalPages }} ({{
                  configPagination.totalItems
                }} {{ lang?.galleryadminpage.pagination.elements }})</span>

              <button @click="changePage(configPagination.page + 1)"
                :disabled="configPagination.page >= configPagination.totalPages" class="btn-pagination">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                    d="M593.23-480 291.92-781.31q-11.92-11.92-11.61-28.38.31-16.46 12.23-28.39Q304.46-850 320.92-850t28.39 11.92l306.23 306.85q10.84 10.85 16.07 24.31 5.24 13.46 5.24 26.92t-5.24 26.92q-5.23 13.46-16.07 24.31L348.69-121.92q-11.92 11.92-28.07 11.61-16.16-.31-28.08-12.23-11.92-11.92-11.92-28.38t11.92-28.39L593.23-480Z" />
                </svg> 
              </button>
            </div>
          </div>
        </Transition>

        <!-- Crear Album -->
        <div v-if="num == 3">
          <h1>{{ lang?.galleryadminpage?.titles?.addImage }}</h1>
          <div v-for="album in albums" :key="album._id" class="album-images">
            <h2 @click="openModal(album)" class="clickable" data-bs-toggle="modal" data-bs-target="#albumModal">
              {{ album.description }} ({{ album.year }})
            </h2>
          </div>
          <!-- Paginación -->
          <div class="pagination">
            <button @click="changePage(configPagination.page - 1)" :disabled="configPagination.page <= 1"
              class="btn-pagination">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#e3e3e3">
                <path
                  d="m127.38-480 301.31 301.31q11.92 11.92 11.62 28.07-.31 16.16-12.23 28.08-11.93 11.92-28.08 11.92t-28.08-11.92L65.08-428.77Q54.23-439.62 49-453.08q-5.23-13.46-5.23-26.92T49-506.92q5.23-13.46 16.08-24.31l306.84-306.85q11.93-11.92 28.39-11.61 16.46.31 28.38 12.23 11.92 11.92 11.92 28.08 0 16.15-11.92 28.07L127.38-480Z" />
              </svg>
            </button>

            <span>{{ lang?.galleryadminpage.pagination.page }} {{ configPagination.page }} {{
              lang?.galleryadminpage.pagination.of }} {{ configPagination.totalPages }} ({{ configPagination.totalItems
              }} {{ lang?.galleryadminpage.pagination.elements }})</span>

            <button @click="changePage(configPagination.page + 1)"
              :disabled="configPagination.page >= configPagination.totalPages" class="btn-pagination">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#e3e3e3">
                <path
                  d="M593.23-480 291.92-781.31q-11.92-11.92-11.61-28.38.31-16.46 12.23-28.39Q304.46-850 320.92-850t28.39 11.92l306.23 306.85q10.84 10.85 16.07 24.31 5.24 13.46 5.24 26.92t-5.24 26.92q-5.23 13.46-16.07 24.31L348.69-121.92q-11.92 11.92-28.07 11.61-16.16-.31-28.08-12.23-11.92-11.92-11.92-28.38t11.92-28.39L593.23-480Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotificationToast v-bind:header="notify.header" v-bind:body="notify.body" />
  <LoadingModal idModal="load" />
  <BaseModal v-if="isAdmin" :title="modalDeleteInfo.title" :body="modalDeleteInfo.body"
    :closeText="modalDeleteInfo.closeText" :acceptText="modalDeleteInfo.acceptText" :onAccept="modalDeleteInfo.onAccept"
    colorAcceptButton="danger" />

  <!-- Bootstrap Modal -->
  <div class="modal fade" id="albumModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedAlbum?.description }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Drop Zone -->
          <div class="drop-zone mb-4 p-5 border rounded d-flex justify-content-center align-items-center"
            @dragover.prevent @drop.prevent="handleDrop" :class="{ 'drag-over': isDragging }"
            @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false">
            <div class="text-center">
              <i class="bi bi-cloud-upload fs-1"></i>
              <p class="mb-0">{{ lang?.galleryadminpage?.descriptions?.dropImage }}</p>
              <label class="btn btn-primary mt-2 btn-label" for="fileInput">
                {{ lang?.galleryadminpage?.titles?.selectFile }}
                <input type="file" id="fileInput" multiple accept="image/*" class="d-none" @change="handleFileSelect" />
              </label>
            </div>
          </div>

          <div class="row g-3 px-sm-md-2">
            <div v-for="(image, index) in images" :key="index" class="col-md-4 col-sm-6">
              <div class="card h-50">
                <img :src="image.url" class="card-img-top" alt="Preview" />
                <div class="card-body" style="align-content: center;">

                  <p class="btn btn-danger btn-sm" @click="removeImage(index)">
                    {{ lang?.galleryadminpage?.titles?.delete }}
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveChanges()">{{
            lang?.galleryadminpage?.bottoms?.addImages }}</button>
          <button type="button" class="btn btn-secondary" @click="closeModal()">{{
            lang?.galleryadminpage?.bottoms?.close }}</button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.drop-zone {
  min-height: 200px;
  background-color: var(--white-color);
  transition: all 0.3s ease;
  cursor: pointer;
}

.drag-over {
  background-color: var(--white-color);
  border: 2px dashed var(--primary-color) !important;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}


.btn-submit {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-submit:hover {
  background-color: var(--secondary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-label {
  background-color: var(--primary-color) !important;
}

.btn-label:hover {
  background-color: var(--secondary-color) !important;
}


.album-images {
  cursor: pointer;
}

.album,
.album-images {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
}

.images {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.images img {
  height: 120px;
  width: auto;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.btn-delete,
.btn-view {
  height: 50px;
  border: none;
  padding: 10px 15px;
}

.btn-delete {
  background-color: var(--danger-color) !important;
  color: white;
  margin-right: 10px;
  opacity: 1;
}

/* Estilos para los botones */
.btn-delete {
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: darkred;
}

.btn-view {
  background-color: #1914b3;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-view:hover {
  background-color: darkblue;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}


.image-card {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  scale: 1;
  margin: 0 0 10px 0;
  transition: scale 0.3s ease-in-out, margin 0.3s ease;
}

.image-card:hover {
  scale: 1.1;
  margin: 0 10px 10px;
}

.image-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-images {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray-color);
  border-radius: 8px;
  height: 200px;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.album .images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.album .images img {
  border-radius: 8px;
}

.album,
.album-images {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Estilos para la paginación */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-pagination {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-pagination:hover {
  background-color: var(--secondary-color);
}

.btn-pagination:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

/* Estilo general de la página */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  margin-top: 40px;
}

h1,
h2 {
  font-weight: bold;
  color: var(--primary-color);
}

h2 {
  margin-top: 15px;
}

.text-center {
  color: var(--dark-color);
}

.btn-submit {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-submit:hover {
  background-color: var(--secondary-color) !important;
  border-color: var(--primary-color) !important;
}

.btn-label {
  background-color: var(--primary-color) !important;
}

.btn-label:hover {
  background-color: var(--secondary-color) !important;
}
</style>
