<script setup>
import wave from '@/components/Wave.vue';
import CardImageRight from '../components/cards/CardImageRight.vue';
import CardImageLeft from '../components/cards/CardImageLeft.vue';
import CardFullImage from '../components/cards/CardFullImage.vue';
import SectionInfo from '../components/templates/SectionInfo.vue'
import { getLangForPage, getConfig } from '@/config/BasicConfig';
import { ref, onMounted } from 'vue';
import { initPreloader, removePreloader } from '@/components/loaders/useBaseLoader'
import BaseLoader from '@/components/loaders/BaseLoader.vue'

import { useRouter } from 'vue-router';

const PAGE = 'homepage';
const router = useRouter();

//Así se implementa el cambio de idioma, IMPORTANTE el operador condicional(o v-if) en el template para que no se caiga la página
const lang = ref({});

onMounted(async () => {
  initPreloader();
  await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
    lang.value = data;
    removePreloader();
  }).catch(() => {
    router.go(0);
  });
});


</script>

<template>
  <section>
    <wave class="mb-20" url="/Apaza/APAZA_FONDO.jpg" title="" description="" data-aos="zoom-out"
      data-aos-duration="1000" />
  </section>

  <section>
    <CardImageRight :title="lang.homepage?.titles?.whatIsTea || ''"
      :description="lang.homepage?.body?.descriptionTea || ''" url="/Apaza/WhatIsTheAutism.png" :order="false"
      data-aos="zoom-in-right" />

    <!-- v-if="lang.homepage && lang.homepage.titles && lang.homepage.body" -->
    <CardImageLeft :title="lang.homepage?.titles?.characteristicsTea || ''"
      :description="lang.homepage?.body?.descriptionCharacteristicsTea || ''" url="/Apaza/FirstCharacteristics.png"
      :order="false" data-aos="zoom-in-left" />
  </section>
  
  <section>
    <SectionInfo :title="lang.homepage?.titles?.titleAboutUs || ''" 
    :subtitle="lang.homepage?.body?.descriptionAboutUs || ''"
    url="/Test/about-left-image.png"
    count1="100" count2="2011" count3="30"
    :countTitle1="lang.homepage?.titles?.countTitle1 || ''" 
    :countTitle2="lang.homepage?.titles?.countTitle2 || ''" 
    :countTitle3="lang.homepage?.titles?.countTitle3 || ''"
    :countDescription1="lang.homepage?.body?.countDescription1 || ''"
    :countDescription2="lang.homepage?.body?.countDescription2 || ''"
    :countDescription3="lang.homepage?.body?.countDescription3 || ''"
    link="/about"
    data-aos="zoom-in-left"/>
  </section>

  <section id="sectionCards" class="a">

    <div class="custom-shape-divider-top-1721696071">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"></path>
      </svg>
    </div>


    <h1 id="title" class="text-center" data-aos="fade-up" data-aos-duration="3000">{{
      lang.homepage?.titles?.informationTeaApaza || '' }}</h1>


    <div class="row mt-5">
      <!--<div class="col-4" v-for="(event, index) in events"
      :key="index">
        <CardFullImage :title="event.title" :url="event.image"
          :descriptionCard="event.description"
          link="/events" />
      </div>-->

      <div class="col-4">
        <CardFullImage :title="lang?.titleAboutUs || ''" url="/Apaza/Fondo-pagina-principal.jpg"
          :descriptionCard="lang.homepage?.body?.infoAboutUs || ''" link="/about" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage :title="lang.homepage?.titles?.characteristicsTea || ''" url="/Apaza/CharacteristicsOfAutism.jpg"
          :descriptionCard="lang.homepage?.body?.infoCharacteristicsTea || ''" link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage :title="lang.homepage?.titles?.treatmentsTitle || ''" url="/Apaza/Tratamientos.jpg"
          :descriptionCard="lang.homepage?.body?.infoTreatments || ''" link="#" data-aos="zoom-out-up" />
      </div>

    </div>

    <h1 id="title" class="text-center mt-5">{{ lang.services + ' - ' + lang.events }}</h1>

    <div class="row mt-5">
      <div class="col-4">
        <CardFullImage :title="lang.homepage?.titles?.recentDiagnosis || ''" url="/Apaza/FirstDiagnostics.jpg"
          :descriptionCard="lang.homepage?.body?.descriptionHelpDiagnostic || ''" link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage :title="lang?.events || ''" url="/Apaza/NewEvents.jpg"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" link="#" data-aos="zoom-out-up" />
      </div>

      <div class="col-4">
        <CardFullImage :title="lang?.events || ''" url="/Apaza/CommunityEvents.jpg"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" link="#" data-aos="zoom-out-up" />
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
  <BaseLoader />
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

/*
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