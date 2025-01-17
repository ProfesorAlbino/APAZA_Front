<template>
    <div class="container py-5 mt-5">
        <h1 class="text-center mb-5">Colaboradores</h1>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div v-for="member in members" :key="member.id" class="col">
                <div class="card h-100 shadow-sm ">
                    <img :src="member.image" class="card-img-top" :alt="member.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ member.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ member.position }}</h6>
                        <p class="card-text">{{ member.description }}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <div class="d-flex justify-content-around">
                            <a :href="'mailto:' + member.email" class="btn btn-outline-secondary btn-sm">
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
        name: 'Colaborador de ejemplo',
        position: 'empresa u organización',
        description: 'Descripción de ejemplo',
        image: '/placeholder.svg?height=300&width=300',
        email: 'ejemplo@gmail.com'
    },
    {
        id: 2,
        name: 'Colaborador de ejemplo',
        position: 'empresa u organización',
        description: 'Descripción de ejemplo',
        image: '/placeholder.svg?height=300&width=300',
        email: 'ejemplo@gmail.com'
    },
    {
        id: 3,
        name: 'Colaborador de ejemplo',
        position: 'empresa u organización',
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
