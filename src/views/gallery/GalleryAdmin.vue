<script setup>
import CardAdmin from '@/components/cards/CardAdmin.vue';
import { ref } from 'vue';
import { addGallery } from '@/services/GalleryService';

const num = ref(0);

const updateNum = (value) => {
    num.value = value;
};

const gallery = ref({
    description: '',
    year: '',
    images: []
});

const createGallery = () => {

    console.log('Evento a crear:', gallery.value);

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
            console.log('Error al crear el evento');
        });
}
</script>

<script>
export default {
    name: 'ImageDragDrop',
    data() {
        return {
            images: [], // Array para almacenar las imágenes
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
                        this.images.push({
                            name: file.name,
                            url: e.target.result,
                            file: file
                        })
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
</script>

<template>
    <div class="text-center mt-3 shadow p-3 mb-5 bg-body rounded ">
        <h1>Galería</h1>
    </div>

    <div class="row">
        <div class="col-4">
            <CardAdmin description="Crea un album con imágenes" title="Crear Album" @click="updateNum(1)" />
        </div>
        <div class="col-4">
            <CardAdmin description="Edita o Elimina imágenes de un album" title="Editar Album" @click="updateNum(2)" />
        </div>
        <div class="col-4">
            <CardAdmin description="Agrega imágenes a un album existente" title="Agregar Imágenes"
                @click="updateNum(3)" />
        </div>
    </div>

    <div class="row">
        <div class="text-center mt-5 shadow p-3 mb-5 bg-body rounded">
            <!-- Agregar Imágenes -->
            <div v-if="num == 1" class="col-12">
                <h1>Agregar Imágenes</h1>

                <form class="mt-5" @submit.prevent="createGallery" >
                    <div class="row">

                        <!-- Campos -->
                        <div class="col-6 form-floating">
                            <input v-model="gallery.description" type="text" class="form-control" id="floatingDescription" placeholder="descripción">
                            <label class="ms-3" for="floatingDescription">Descripción</label>
                        </div>

                        <div class="col-6 form-floating mb-3">
                            <input v-model="gallery.year" type="number" class="form-control" id="floatingNumber" placeholder="año">
                            <label class="ms-3" for="floatingNumber">Año</label>
                        </div>

                        <!-- Drop Zone -->
                        <div class="drop-zone mb-4 p-5 border rounded d-flex justify-content-center align-items-center"
                            @dragover.prevent @drop.prevent="handleDrop" :class="{ 'drag-over': isDragging }"
                            @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false">
                            <div class="text-center">
                                <i class="bi bi-cloud-upload fs-1"></i>
                                <p class="mb-0">Arrastra y suelta imágenes aquí o</p>
                                <label class="btn btn-primary mt-2 btn-label" for="fileInput">
                                    Selecciona archivos
                                    <input type="file" id="fileInput" multiple accept="image/*" class="d-none"
                                        @change="handleFileSelect">
                                </label>
                            </div>
                        </div>

                        <!-- Imágenes -->
                        <div class="row g-3">
                            <div v-for="(image, index) in images" :key="index" class="col-md-4 col-sm-6">
                                <div class="card h-100">
                                    <img :src="image.url" class="card-img-top" alt="Preview">
                                    <div class="card-body">
                                        <p class="card-text">{{ image.name }}</p>
                                        <p class="btn btn-danger btn-sm" @click="removeImage(index)">
                                            Eliminar
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botón -->
                    <div class="text-center mt-5">
                        <button type="submit" class="btn btn-primary btn-submit">Guardar</button>
                    </div>
                </form>
            </div>

            <!-- Editar Imágenes -->
            <div v-if="num == 2">
                <h1>Editar</h1>
            </div>

            <!-- Crear Album -->
            <div v-if="num == 3">
                <h1>Crear Album</h1>
            </div>

            <div v-else>
                <h1>Otro</h1>
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