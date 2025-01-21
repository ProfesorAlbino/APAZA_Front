<script setup>
import wave from '@/components/Wave.vue';
import CardImageRight from '../components/cards/CardImageRight.vue';
import CardImageLeft from '../components/cards/CardImageLeft.vue';
import CardFullImage from '@/components/cards/CardFullImage.vue';

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

function navigate(url) {
  router.push(url);
}



</script>

<template>
  <section id="hero">
    <wave class="mb-20" url="/Apaza/APAZA_FONDO.jpg" title="" description="" data-aos="zoom-out"
      data-aos-duration="1000" />
  </section>

  <section id="principal">
    <CardImageRight :title="lang.homepage?.titles?.whatIsTea || ''"
      :description="lang.homepage?.body?.descriptionTea || ''" url="/Apaza/WhatIsTheAutism.png" :order="false"
      data-aos="zoom-in-right" />

    <!-- v-if="lang.homepage && lang.homepage.titles && lang.homepage.body" -->
    <CardImageLeft :title="lang.homepage?.titles?.characteristicsTea || ''"
      :description="lang.homepage?.body?.descriptionCharacteristicsTea || ''" url="/Apaza/FirstCharacteristics.png"
      :order="false" data-aos="zoom-in-left" />
  </section>

  <section class="about-section">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <img src="/Apaza/APAZA_FONDO.jpg" alt="Acerca de Nosotros" class="img-fluid about-image">
      </div>
      <div class="col-lg-6">
        <h2 class="about-title">{{ lang.homepage?.titles?.informationTeaApaza || '' }}</h2>
        <div class="about-text">
          <p>
            {{ lang.homepage?.body?.aboutDescription1 || '' }}
            <span class="highlight-text">{{ lang.homepage?.body?.aboutDescription2 || '' }}</span>,
            {{ lang.homepage?.body?.aboutDescription3 || '' }}
          </p>

          <p>{{lang.homepage?.body?.aboutDescription4 || ''}}</p>

          <p>{{ lang.homepage?.body?.aboutDescription5 || ''}}
            <span class="highlight-text">{{ lang.homepage?.body?.aboutDescription6 || '' }}</span> {{ lang.homepage?.body?.aboutDescription7 || '' }}
          </p>
          <a @click="navigate('/about')" class="btn_about btn btn-primary">{{ lang.homepage?.body?.btnAboutUs || '' }}</a>
        </div>
      </div>

    </div>
  </section>

  <svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 170" version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
        <stop stop-color="var(--primary-color)" offset="0%"></stop>
        <stop stop-color="var(--primary-color)" offset="100%"></stop>
      </linearGradient>
    </defs>
    <path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)"
      d="M0,85L60,96.3C120,108,240,130,360,119C480,108,600,62,720,59.5C840,57,960,96,1080,99.2C1200,102,1320,68,1440,45.3C1560,23,1680,11,1800,19.8C1920,28,2040,57,2160,62.3C2280,68,2400,51,2520,45.3C2640,40,2760,45,2880,48.2C3000,51,3120,51,3240,42.5C3360,34,3480,17,3600,17C3720,17,3840,34,3960,39.7C4080,45,4200,40,4320,51C4440,62,4560,91,4680,87.8C4800,85,4920,51,5040,42.5C5160,34,5280,51,5400,68C5520,85,5640,102,5760,102C5880,102,6000,85,6120,82.2C6240,79,6360,91,6480,96.3C6600,102,6720,102,6840,99.2C6960,96,7080,91,7200,73.7C7320,57,7440,28,7560,22.7C7680,17,7800,34,7920,39.7C8040,45,8160,40,8280,42.5C8400,45,8520,57,8580,62.3L8640,68L8640,170L8580,170C8520,170,8400,170,8280,170C8160,170,8040,170,7920,170C7800,170,7680,170,7560,170C7440,170,7320,170,7200,170C7080,170,6960,170,6840,170C6720,170,6600,170,6480,170C6360,170,6240,170,6120,170C6000,170,5880,170,5760,170C5640,170,5520,170,5400,170C5280,170,5160,170,5040,170C4920,170,4800,170,4680,170C4560,170,4440,170,4320,170C4200,170,4080,170,3960,170C3840,170,3720,170,3600,170C3480,170,3360,170,3240,170C3120,170,3000,170,2880,170C2760,170,2640,170,2520,170C2400,170,2280,170,2160,170C2040,170,1920,170,1800,170C1680,170,1560,170,1440,170C1320,170,1200,170,1080,170C960,170,840,170,720,170C600,170,480,170,360,170C240,170,120,170,60,170L0,170Z">
    </path>
  </svg>
  <section id="sectionCards" class="py-4">
    <h1 class="title text-center mb-5">{{ lang.homepage?.titles?.ourServices || ''}}</h1>

    <div class="row g-4">
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
    </div>

    <h1 class="title text-center mt-5 mb-5">{{ lang.homepage?.titles?.ourEvents || ''}}</h1>

    <div class="row g-4">
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
      <div class="col-12 col-md-4">
        <CardFullImage :title="lang.homepage?.titles?.events || ''"
          :descriptionCard="lang.homepage?.body?.infoEvents || ''" url="/Apaza/APAZA_FONDO.jpg" link="/events" :btn="lang.homepage?.titles?.titleButton || ''"
          data-aos="zoom-in" />
      </div>
    </div>

  </section>

  <BaseLoader />
</template>

<style scoped>
#hero{
  margin-top: -3%;
}

#sectionCards {
  margin-top: -5px;
  background-color: var(--primary-color);
}

.title {
  color: var(--text-color-1);
  font-family: var(--text-font-1);
}

.about-section {
  background-color: var(--background-color-3);
  padding: 5rem 0;
  font-family: var(--text-font-1);
}

.about-title {
  color: var(--text-color-2);
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
}

.about-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 80px;
  height: 3px;
  background-color: var(--accent-color);
}

.about-text {
  color: var(--text-color-3);
  font-size: 1.1rem;
  line-height: 1.8;
}

.about-image {
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.about-image:hover {
  transform: scale(1.02);
}

.highlight-text {
  color: var(--accent-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .about-section {
    padding: 3rem 0;
  }

  .about-image {
    margin-bottom: 2rem;
  }
}

.btn_about {
  background-color: var(--accent-color);
  color: var(--text-color-1);
  font-family: var(--text-font-1);
  font-weight: 600;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn_about:hover {
  background-color: var(--background-color);

}
</style>