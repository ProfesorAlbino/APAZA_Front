<script setup>
import CardAdmin from '@/components/cards/CardAdmin.vue'
import { onMounted, ref } from 'vue'
import { addGallery } from '@/services/GalleryService'
import { getLangForPage, getConfig } from '@/config/BasicConfig'
import router from '@/router'
import { isUserLoggedAdmin } from '@/utils/Validations'
import CreateAlbum from '@/assets/create-album.json'
import updateAlbum from '@/assets/update-album.json'
import AddPhoto from '@/assets/AddPhoto.json'
import LottieEmptyBoxAnimation from '@/components/LottieEmptyBoxAnimation.vue'
const num = ref(0)
const isAdmin = ref(false)
const lang = ref({})
const PAGE = 'galleryadminpage'

const updateNum = (value) => {
  num.value = value
}

onMounted(async () => {
  isAdmin.value = isUserLoggedAdmin()
  await getLangForPage(getConfig().CURRENT_LANG, PAGE)
    .then((data) => {
      lang.value = data
    })
    .catch(() => {
      router.go(0)
    })
})
</script>

<script>
const gallery = ref({
  description: '',
  year: '',
  images: []
})

export default {
  name: 'ImageDragDrop',
  data() {
    return {
      images: [],
      isDragging: false
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragging = false
      const files = e.dataTransfer.files
      this.processFiles(files)
    },
    handleFileSelect(e) {
      const files = e.target.files
      this.processFiles(files)
    },
    processFiles(files) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const imageObject = {
              name: file.name,
              url: e.target.result,
              file: file
            }

            // Actualizar el array local de imágenes
            this.images.push(imageObject)
          }
          reader.readAsDataURL(file)
        }
      }
    },
    removeImage(index) {
      this.images.splice(index, 1)
    }
  }
}

const createGallery = () => {
  addGallery(gallery.value)
    .then(() => {
      gallery.value = {
        description: '',
        year: '',
        images: []
      }
      document.querySelector('form').classList.remove('was-validated')
    })
    .catch(() => {
      console.log('Error al crear el evento')
    })
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
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.createAlbumImages"
          :title="lang?.galleryadminpage?.titles?.addAlbum" :icon="CreateAlbum" @click="updateNum(1)" />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.editDeleteAlbum"
          :title="lang?.galleryadminpage?.titles?.editAlbum" :icon="updateAlbum" @click="updateNum(2)" />
      </div>
      <div class="col-12 col-md-4 mb-3">
        <CardAdmin :description="lang?.galleryadminpage?.descriptions?.addImageAlbum"
          :title="lang?.galleryadminpage?.titles?.addImage" :icon="AddPhoto" @click="updateNum(3)" />
      </div>
    </div>

    <div class="row">
      <div class="text-center mt-5 shadow p-3 mb-5 bg-body rounded">
        <!-- Agregar Imágenes -->
        <div v-if="num == 1" class="col-12">
          <h1>{{ lang?.galleryadminpage?.titles?.addAlbum }}</h1>

          <form class="mt-5" @submit.prevent="createGallery">
            <div class="row">
              <!-- Campos -->
              <div class="col-6 form-floating">
                <input v-model="gallery.description" type="text" class="form-control" id="floatingDescription"
                  :placeholder="lang?.galleryadminpage?.titles?.description" />
                <label class="ms-3" for="floatingDescription">{{
                  lang?.galleryadminpage?.titles?.description
                }}</label>
              </div>

              <div class="col-6 form-floating mb-3">
                <input v-model="gallery.year" type="number" class="form-control" id="floatingNumber"
                  :placeholder="lang?.galleryadminpage?.titles?.year" />
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
        <div v-if="num == 2">
          <h1>{{ lang?.galleryadminpage?.titles?.edit }}</h1>
          <div v-if="images.length === 0">
            <p class="mb-0">Aun no hay nada para editar!</p>
            <LottieEmptyBoxAnimation/>
          </div>
        </div>

        <!-- Crear Album -->
        <div v-if="num == 3">
          <h1>{{ lang?.galleryadminpage?.titles?.addImage }}</h1>
        </div>

        <div v-else>
          <h1>{{ lang?.galleryadminpage?.titles?.other }}</h1>
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
</style>
