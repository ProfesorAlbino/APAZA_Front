<template>
    <div class="events-container my-5">
        <div class="banner text-center py-5 mb-5">
            <h1 class="display-4 text-white">Eventos APAZA</h1>
            <!-- <p class="lead text-white" @click="goToAddEvent">Agregar evento</p> -->
        </div>
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div v-for="(event, index) in events" :key="index" class="col">
                    <div class="card h-100 event-card" @click="goToEventPage(event)">
                        <img :src="event.image" class="card-img-top" :alt="event.title">
                        <div class="card-body">
                            <h5 class="card-title">{{ event.title }}</h5>
                            <p class="card-text">{{ event.description }}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">{{ format(event.date.replace('Z', ''), 'full', 'es') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center" v-if="isAdmin">
            <button @click="goToAddEvent" class="btn btn-primary btn-lg btn-block mt-5">Agregar evento</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEvents } from '@/services/EventService';
import { useRouter } from 'vue-router';
import { isUserLoggedAdmin } from '@/utils/Validations';
import { format } from '@formkit/tempo';

const router = useRouter();
const events = ref([]);
const isAdmin = ref(false);

const getEvent = async () => {
    try {
        const data = await getEvents();
        events.value = data.data.data;
    } catch (error) {
        //window.location.reload();
        //router.push('/events'); // <-- Estoy en la pagina de eventos, si hay un error esto debería recargar la página ***Probar***
        router.go(0); // <-- Esto debería recargar la página ***Probar*** Según ChatGPT
    }
};

function goToEventPage(event) {
    sessionStorage.setItem('event', JSON.stringify(event));
    router.push(`/event`);
}

function goToAddEvent() {
    router.push('/add-event');
}


onMounted(() => {
    isAdmin.value = isUserLoggedAdmin();
    getEvent();
});
</script>

<style scoped>
.events-container {
    /* background-color: #f8f9fa; */
    background-color: var(--background-color-3);
    min-height: 100vh;
}

.banner {
    /* background: linear-gradient(45deg, #ff6b6b, #4ecdc4); */
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    margin-bottom: 2rem;
}

.event-card {
    transition: all 0.3s ease;
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    /* <-- El box-shadow no importa porque siempre es negro por eso no puse var() */
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}

.card-title {
    /* color: #333; */
    color: var(--text-color-3);
    font-weight: bold;
}

.card-text {
    /* color: #666; */
    color: var(--text-color-3);
}

.card-footer {
    /* background-color: #fff; */
    background-color: var(--background-color-3);
    /* border-top: 1px solid #f0f0f0; */
    border-top: 1px solid var(--background-color);
}
</style>