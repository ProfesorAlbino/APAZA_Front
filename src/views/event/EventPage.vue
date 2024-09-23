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
                            <h5 class="card-title">Información</h5>
                            <p class="card-text"><strong>Fecha:</strong> {{ event.date }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12">
                    <h2>Descripción</h2>
                    <p>{{ event.description }}</p>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-12 text-center">
                    <button @click="backToList" class="btn btn-secondary">Volver a la lista de eventos</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { format } from '@formkit/tempo';

const router = useRouter();

const event = ref({});

const backToList = () => {
    router.push('/events');
}

onMounted(async () => {
    const item = sessionStorage.getItem('event');
    if (!item) router.push('/events');
    const objItem = JSON.parse(item);
    //objItem.date = objItem.date.replace('Z', ''); // <-- Esto es para quitar la Z del final de la fecha, si no se quita le quita un día a la fecha
    objItem.date = format(new Date(objItem.date.replace('Z', '')), { date: "full" }, 'es');
    event.value = objItem;
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
    color: #333;
    margin-bottom: 1rem;
}

.btn-primary {
    background-color: #4ecdc4;
    border-color: #4ecdc4;
}

.btn-primary:hover {
    background-color: #45b7ae;
    border-color: #45b7ae;
}

.btn-secondary {
    background-color: #ff6b6b;
    border-color: #ff6b6b;
}

.btn-secondary:hover {
    background-color: #ff5252;
    border-color: #ff5252;
}
</style>