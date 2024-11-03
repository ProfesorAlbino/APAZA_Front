<template>
    <BaseCarousel :images="getImagesFromEvents()" v-if="!isInAdminPage(router.currentRoute.value.path)"/>

    <section :class="hasToShowMargin()">
        <div class="events-container">
            <div class="banner text-center py-5 rounded-5 rounded-top-0">
                <h1 class="display-4 text-white">{{ lang?.events }}</h1>
                <div class="text-center" v-if="isAdmin">
                    <button @click="goToAddEvent" class="btn btn-primary btn-lg btn-block" v-if="isInAdminPage(router.currentRoute.value.path)">{{
                        lang?.eventhomepage?.titles?.addEvent }}</button>
                </div>
            </div>
            <div class="events-container relative px-5">

                <img src="/Apaza/rompecabezas.jpg" alt="rompecabezas" class="img-fluid top-0 left-0 w-full h-full object-cover opacity-50 z2"
                    id="background" />

                <div class="z1">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <CardPresentInfoOverImage v-for="(event, index) in events" :key="index" :title="event.title"
                            :description="event.description" :image="event.image"
                            :date="format(event.date.replace('Z', ''), 'full', getConfig().CURRENT_LANG)" @click="goToEventPage(event)" />

                    </div>
                    <div v-if="charge" class="m-5 p-5 d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="ms-3 fs-4">{{ lang?.loading }}</p>
                    </div>

                    <div v-if="events.length === 0 && !charge" class="text-center">
                        <h2>{{ lang?.eventhomepage?.titles?.noEvents }}</h2>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEvents } from '@/services/EventService';
import { useRouter } from 'vue-router';
import { isUserLoggedAdmin, isInAdminPage } from '@/utils/Validations';
import { format } from '@formkit/tempo';
import { getLangForPage, getConfig } from '@/config/BasicConfig';
import CardPresentInfoOverImage from '@/components/cards/CardPresentInfoOverImage.vue';
import BaseCarousel from '@/components/carousel/BaseCarousel.vue';

const router = useRouter();
const events = ref([]);
const isAdmin = ref(false);
const charge = ref(true);
const PAGE = 'eventhomepage';
const lang = ref({});

const getEvent = async () => {
    try {
        await getEvents().then(data => {
            events.value = data.data.data;
            charge.value = false;
        });
    } catch (error) {
        router.go(0); 
    }
};

function getImagesFromEvents() {
    return events.value.map(event => event.image);
}

function goToEventPage(event) {
    sessionStorage.setItem('event', JSON.stringify(event));
    router.push(`/event`);
}

function goToAddEvent() {
    router.push('/admin/add-event');
}

/* function isInAdminPage(){
    return router.currentRoute.value.path === "/admin/event-list";
} */

function hasToShowMargin(){
    return events.value.length === 0 && !isInAdminPage(router.currentRoute.value.path) ? 'mt-3' : '';
}

onMounted(async () => {
    isAdmin.value = isUserLoggedAdmin();
    await getEvent();
    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
    }).catch(() => {
        router.go(0);
    });
});
</script>

<style scoped>
.relative {
    position: relative;
}

.absolute {
    position: absolute;
}

.top-0 {
    top: 0;
}

.left-0 {
    left: 0;
}

.w-full {
    width: 100%;
}

.h-full {
    height: 100%;
}

.object-cover {
    object-fit: cover;
}

.opacity-50 {
    opacity: 0.5;
}

.z2 {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
}

.z1 {
    position: relative;
    z-index: 2;
}

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
    /* background-color: var(--background-color-3); */
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