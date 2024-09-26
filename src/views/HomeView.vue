<script setup>
import wave from '../components/Wave.vue'
import CardImageRight from '../components/cards/CardImageRight.vue'
import CardImageLeft from '../components/cards/CardImageLeft.vue'
import CardFullImage from '../components/cards/CardFullImage.vue'
/*import { ref, onMounted } from 'vue';

 import { getEvents } from '@/services/EventService';

const events = ref([]);

const getEvent = async () => {
  try {
    const data = await getEvents(); // Obtenemos los eventos
    //events.value = data.data.data; // Actualizamos el valor de la referencia
    events.value = data.data.data.slice(0, 3);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Similar al useEffect en React, se ejecuta cuando el componente se monta
onMounted(() => {
  getEvent();
}); */


</script>

<template>
  <section>
    <wave class="mb-20" url="/Apaza/APAZA_FONDO.jpg" title="" description="" />
  </section>

  <section>
    <CardImageRight title="¿Que es el TEA?" description="El TEA es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
                            mundo y con las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y relacionarse
                            con los demás, y pueden tener intereses y comportamientos repetitivos."
      url="/Apaza/WhatIsTheAutism.png" :order="false" data-aos="zoom-in-right" />

    <CardImageLeft title="Características del Autismo" description="El Trastorno del Espectro Autista (TEA), presenta síntomas que pueden variar en cada niño. Algunos signos comunes incluyen 
                  dificultad para comunicarse o mantener contacto visual, comportamientos repetitivos como mecerse o aletear, preferencia por la rutina y 
                  resistencia al cambio, y problemas para entender emociones o interactuar socialmente."
      url="/Apaza/FirstCharacteristics.png" :order="false" data-aos="zoom-in-left" />
  </section>

  <section id="sectionCards" class="a">

    <div class="custom-shape-divider-top-1721696071">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"></path>
      </svg>
    </div>

    <h1 id="title" class="text-center" data-aos="fade-up" data-aos-duration="3000">Información sobre el TEA y APAZA</h1>


    <div class="row mt-5">
      <!--<div class="col-4" v-for="(event, index) in events"
      :key="index">
        <CardFullImage :title="event.title" :url="event.image"
          :descriptionCard="event.description"
          link="/events" />
      </div>-->

      <div class="col-4">
        <CardFullImage title="Sobre Nosotros" url="/Apaza/Fondo-pagina-principal.jpg"
          descriptionCard="Esta sección ofrece información y apoyo para personas que han recibido recientemente un diagnóstico de autismo"
          link="/about" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage title="Síntomas del Autismo" url="/Apaza/CharacteristicsOfAutism.jpg"
          descriptionCard="Conoce los síntomas y señales comunes del autismo para una identificación temprana y precisa."
          link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage title="Tratamientos" url="/Apaza/Tratamientos.jpg"
          descriptionCard="Explora diferentes tratamientos y terapias que pueden ayudar en el desarrollo y bienestar de personas con autismo."
          link="#" data-aos="zoom-out-up" />
      </div>

    </div>

    <h1 id="title" class="text-center mt-5">Servicios y Eventos </h1>

    <div class="row mt-5">
      <div class="col-4">
        <CardFullImage title="Recién Diagnosticado" url="/Apaza/FirstDiagnostics.jpg"
          descriptionCard="Esta sección ofrece información y apoyo para personas que han recibido recientemente un diagnóstico de autismo"
          link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage title="Nuestros Eventos" url="/Apaza/NewEvents.jpg"
          descriptionCard="Explora nuestros eventos y entérate de todas nuestras actividades para no perderte ninguna."
          link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage title="Eventos Comunitarios" url="/Apaza/CommunityEvents.jpg"
          descriptionCard="Asiste a eventos organizados para conectar a familias y personas dentro del espectro autista."
          link="#" data-aos="zoom-out-up" />
      </div>
    </div>

    <div class="custom-shape-divider-bottom-1721776550">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"></path>
      </svg>
    </div>
  </section>

</template>

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


/* .custom-shape-divider-top-1721696071 {
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
  width: calc(300% + 1.3px);
  height: 84px;
}

.custom-shape-divider-top-1721696071 .shape-fill {
  fill: var(--background-color-3);
  animation: wave-animation 15s linear infinite;
}

@keyframes wave-animation {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-33.33%);
  }
} */



.custom-shape-divider-bottom-1721776550 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1721776550 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 131px;
}

.custom-shape-divider-bottom-1721776550 .shape-fill {
  fill: #FFFFFF;
}
</style>