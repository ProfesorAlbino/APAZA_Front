<template>
    <BaseCarousel :images="getImagesFromEvents()" />

    <section>
        <div class="events-container mb-5">
            <div class="banner text-center py-5 mb-5">
                <h1 class="display-4 text-white">Eventos APAZA</h1>
                <!-- <p class="lead text-white" @click="goToAddEvent">Agregar evento</p> -->
            </div>
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <CardPresentInfoOverImage v-for="(event, index) in events" :key="index" :title="event.title"
                        :description="event.description" :image="event.image"
                        :date="format(event.date.replace('Z', ''), 'full', 'es')" @click="goToEventPage(event)" />
                </div>
            </div>
            <div class="text-center" v-if="isAdmin">
                <button @click="goToAddEvent" class="btn btn-primary btn-lg btn-block mt-5">Agregar evento</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEvents } from '@/services/EventService';
import { useRouter } from 'vue-router';
import { isUserLoggedAdmin } from '@/utils/Validations';
import { format } from '@formkit/tempo';
import CardPresentInfoOverImage from '@/components/cards/CardPresentInfoOverImage.vue';
import BaseCarousel from '@/components/carousel/BaseCarousel.vue';

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

function getImagesFromEvents(){
    return events.value.map(event => event.image);
}

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
#sectionCards {
    background-color: var(--primary-color);
    display: flex;

    padding: 10rem;
    position: relative;
    height: 200%;
    color: var(--text-color-1);
    font-family: var(--text-font-1);

    display: flex;
    flex-direction: column;
}

#title {
    color: var(--text-color-1);
    font-family: var(--text-font-1);
}

.custom-shape-divider-top-1721696071 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-top-1721696071 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 84px;
}

.custom-shape-divider-top-1721696071 .shape-fill {
    fill: var(--background-color-3);
}

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