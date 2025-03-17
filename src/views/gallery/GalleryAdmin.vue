<script setup>
import CardAdmin from '@/components/cards/CardAdmin.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { addGallery, deleteGallery, getGallery,updateGallery } from '@/services/GalleryService'
import AddPhotoIcon from '@/components/icons/others/AddPhotoIcon.vue'
import EditAlbumIcon from '@/components/icons/others/EditAlbumIcon.vue'
import AlbumIcon from '@/components/icons/others/AlbumIcon.vue'
import { getLangForPage, getConfig } from '@/config/BasicConfig'
import router from '@/router'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { Modal, Toast } from 'bootstrap'
import LoadingModal from '@/components/modals/LoadingModal.vue'
import NotificationToast from '@/components/toasts/NotificationToast.vue'
import BaseModal from '@/components/modals/BaseModal.vue'



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


     modal.value= new Modal(document.getElementById('albumModal'))
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


const deleteAlbum = async (albumId) =>{
      gallery.value = albums.value.find((album) => album._id === albumId);
      modalDelete();
    }

    const viewAlbum= (albumId) =>{
      updatedGallery.value= albums.value.find((album) => album._id === albumId);
      sessionStorage.setItem('gallery', JSON.stringify(updatedGallery.value));
      router.push('/admin/gallery-detail');
    }

    const changePage= (page)=> {
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
    <div class="text-center mt-3 shadow p-3 mb-5 bg-body rounded">
      <h1>{{ lang?.galleryadminpage?.titles?.gallery }}</h1>
    </div>

    <div class="row gx-2">
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin
          :description="lang?.galleryadminpage?.descriptions?.createAlbumImages"
          :title="lang?.galleryadminpage?.titles?.addAlbum"
          :icon="AlbumIcon"
          @click="updateNum(1)"
        />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin
          :description="lang?.galleryadminpage?.descriptions?.editDeleteAlbum"
          :title="lang?.galleryadminpage?.titles?.editAlbum"
          :icon="EditAlbumIcon"
          @click="getGallerys(1,2)"
        />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin
          :description="lang?.galleryadminpage?.descriptions?.addImageAlbum"
          :title="lang?.galleryadminpage?.titles?.addImage"
          :icon="AddPhotoIcon"
          @click="getGallerys(1,3)"
        />
      </div>
    </div>

    <div class="row">
      <div class="text-center mt-5 shadow p-3 mb-5 bg-body rounded">
        <!-- Agregar Imágenes -->
        <div v-if="num == 1" class="col-12">
          <h1>{{ lang?.galleryadminpage?.titles?.addAlbum }}</h1>

          <form class="mt-5" @submit.prevent="pushGallery">
            <div class="row">
              <!-- Campos -->
              <div class="col-6 form-floating">
                <input
                  v-model="gallery.description"
                  type="text"
                  class="form-control"
                  id="floatingDescription"
                  :placeholder="lang?.galleryadminpage?.titles?.description"
                  required
                />
                <label class="ms-3" for="floatingDescription">{{
                  lang?.galleryadminpage?.titles?.description
                }}</label>
              </div>

              <div class="col-6 form-floating mb-3">
                <input
                  v-model="gallery.year"
                  type="number"
                  class="form-control"
                  id="floatingNumber"
                  :placeholder="lang?.galleryadminpage?.titles?.year"
                  required
                />
                <label class="ms-3" for="floatingNumber">{{
                  lang?.galleryadminpage?.titles?.year
                }}</label>
              </div>

              <!-- Drop Zone -->
              <div
                class="drop-zone mb-4 p-5 border rounded d-flex justify-content-center align-items-center"
                @dragover.prevent
                @drop.prevent="handleDrop"
                :class="{ 'drag-over': isDragging }"
                @dragenter.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
              >
                <div class="text-center">
                  <i class="bi bi-cloud-upload fs-1"></i>
                  <p class="mb-0">{{ lang?.galleryadminpage?.descriptions?.dropImage }}</p>
                  <label class="btn btn-primary mt-2 btn-label" for="fileInput">
                    {{ lang?.galleryadminpage?.titles?.selectFile }}
                    <input
                      type="file"
                      id="fileInput"
                      multiple
                      accept="image/*"
                      class="d-none"
                      @change="handleFileSelect"
                    />
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
        <div v-if="num == 2">
          <h1>{{ lang?.galleryadminpage?.titles?.edit }}</h1>

          <!-- Listado de Álbumes -->
          <div v-for="album in albums" :key="album._id" class="album">
            <h2>{{ album.description }} ({{ album.year }})</h2>

            <div class="images">
              <img
                v-for="(img, index) in album.images.slice(0, 5)"
                :key="index"
                :src="img"
                alt="Imagen del álbum"
              />
            </div>

            <button @click="deleteAlbum(album._id)" class="btn-delete">{{ lang?.galleryadminpage.bottoms.delete }}</button>
            <button @click="viewAlbum(album._id)" class="btn-view">{{ lang?.galleryadminpage.bottoms.update }}</button>
          </div>

          <!-- Paginación -->
          <div class="pagination">
            <button
              @click="changePage(configPagination.page - 1)"
              :disabled="configPagination.page <= 1"
            >
            {{ lang?.galleryadminpage.pagination.prev }}
            </button>

            <span
              >{{ lang?.galleryadminpage.pagination.page }} {{ configPagination.page }} {{ lang?.galleryadminpage.pagination.of }} {{ configPagination.totalPages }} ({{
                configPagination.totalItems
              }}
              {{ lang?.galleryadminpage.pagination.elements }})</span
            >

            <button
              @click="changePage(configPagination.page + 1)"
              :disabled="configPagination.page >= configPagination.totalPages"
            >
            {{ lang?.galleryadminpage.pagination.next }}
            </button>
          </div>
        </div>

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
            <button
              @click="changePage(configPagination.page - 1)"
              :disabled="configPagination.page <= 1"
            >
            {{ lang?.galleryadminpage.pagination.prev }}
            </button>

            <span
              >{{ lang?.galleryadminpage.pagination.page }} {{ configPagination.page }}  {{ lang?.galleryadminpage.pagination.of }} {{ configPagination.totalPages }} ({{
                configPagination.totalItems
              }}
              {{ lang?.galleryadminpage.pagination.elements }})</span
            >

            <button
              @click="changePage(configPagination.page + 1)"
              :disabled="configPagination.page >= configPagination.totalPages"
            >
            {{ lang?.galleryadminpage.pagination.next }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotificationToast v-bind:header="notify.header" v-bind:body="notify.body" />
  <LoadingModal idModal="load" />
  <BaseModal v-if="isAdmin" :title="modalDeleteInfo.title" :body="modalDeleteInfo.body"
        :closeText="modalDeleteInfo.closeText" :acceptText="modalDeleteInfo.acceptText"
        :onAccept="modalDeleteInfo.onAccept" colorAcceptButton="danger" />

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
           <div
                class="drop-zone mb-4 p-5 border rounded d-flex justify-content-center align-items-center"
                @dragover.prevent
                @drop.prevent="handleDrop"
                :class="{ 'drag-over': isDragging }"
                @dragenter.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
              >
                <div class="text-center">
                  <i class="bi bi-cloud-upload fs-1"></i>
                  <p class="mb-0">{{ lang?.galleryadminpage?.descriptions?.dropImage }}</p>
                  <label class="btn btn-primary mt-2 btn-label" for="fileInput">
                    {{ lang?.galleryadminpage?.titles?.selectFile }}
                    <input
                      type="file"
                      id="fileInput"
                      multiple
                      accept="image/*"
                      class="d-none"
                      @change="handleFileSelect"
                    />
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
            <button type="button" class="btn btn-primary" @click= "saveChanges()">{{ lang?.galleryadminpage?.bottoms?.addImages }}</button>
            <button type="button" class="btn btn-secondary" @click="closeModal()">{{lang?.galleryadminpage?.bottoms?.close}}</button>

          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
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
.album, .album-images{
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
}
.images img {
  width: 100px;
  height: auto;
  margin-right: 5px;
}


.btn-delete {
  background-color: red;
  color: white;
  margin-right: 10px;
}
.btn-view {
  background-color: blue;
  color: white;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}


</style>
