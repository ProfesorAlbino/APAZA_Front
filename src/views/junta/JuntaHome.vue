<template>
    <div class="container py-5 mt-5">
        <h1 class="text-center mb-5">Nuestra Junta Directiva</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div v-for="miembro in members" :key="miembro.id" class="col">
                <div class="card h-100 shadow-sm ">
                    <img :src="miembro.image" class="card-img-top" :alt="miembro.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ miembro.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ miembro.position }}</h6>
                        <p class="card-text">{{ miembro.description }}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <div class="d-flex justify-content-around">
                            <a :href="'mailto:' + miembro.email" class="btn btn-outline-secondary btn-sm">
                                <i class="bi bi-envelope"></i> Contacto
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const members = ref([
    {
        id: 1,
        name: 'Adonay Artavia',
        position: 'Presidente',
        description: 'Descripción de ejemplo',
        image: '/placeholder.svg?height=300&width=300',
        email: 'ejemplo@gmail.com'
    },
    {
        id: 2,
        name: 'Yanory Meza Durán',
        position: 'Vicepresidente',
        description: 'Descripción de ejemplo',
        image: '/placeholder.svg?height=300&width=300',
        email: 'ejemplo@gmail.com'
    },
    {
        id: 3,
        name: 'Persona de ejemplo',
        position: 'Vocal',
        description: 'Descripción de ejemplo',
        image: '/placeholder.svg?height=300&width=300',
        email: 'ejemplo@gmail.com'
    }
])
</script>

<style scoped>
.card {
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>
