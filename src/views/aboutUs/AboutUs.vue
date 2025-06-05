<script setup>
import Timeline from '../../components/timeLine/TimeLine.vue'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { initPreloader, removePreloader } from '@/components/loaders/useBaseLoader'
import { getLangForPage, getConfig } from '@/config/BasicConfig';
import apazaImg from '@/assets/imgwebp/aboutUs.jpg'

const PAGE = 'aboutUs';
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
    <div class="w-100">

        <section class="about-section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 about-content">
                        <p class="about-subtitle">{{ lang.aboutUs?.titles?.aboutUs || ''}}</p>
                        <h1 class="about-title">{{ lang.aboutUs?.titles?.ourOrigins || ''}}</h1>
                        <div class="about-text">
                            <p>{{ lang.aboutUs?.body?.aboutDescription1 || ''}} <span class="highlight">{{ lang.aboutUs?.body?.aboutDescription2 || ''}} </span>, 
                                {{ lang.aboutUs?.body?.aboutDescription3 || ''}} </p>

                            <p>{{ lang.aboutUs?.body?.aboutDescription4 || ''}}  <span class="highlight">{{ lang.aboutUs?.body?.aboutDescription5 || ''}} </span> y
                                {{ lang.aboutUs?.body?.aboutDescription6 || ''}} 
                                <span class="highlight">{{ lang.aboutUs?.body?.aboutDescription7 || ''}} </span> {{ lang.aboutUs?.body?.aboutDescription8 || ''}} 
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="image-container">
                            <img :src="apazaImg" alt="Acerca de Nosotros" class="img-fluid about-image">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 100" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stop-color="var(--background-color)" offset="0%"></stop>
                    <stop stop-color="var(--background-color)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)"
                d="M0,30L60,26.7C120,23,240,17,360,21.7C480,27,600,43,720,46.7C840,50,960,40,1080,35C1200,30,1320,30,1440,28.3C1560,27,1680,23,1800,26.7C1920,30,2040,40,2160,48.3C2280,57,2400,63,2520,68.3C2640,73,2760,77,2880,70C3000,63,3120,47,3240,45C3360,43,3480,57,3600,63.3C3720,70,3840,70,3960,71.7C4080,73,4200,77,4320,73.3C4440,70,4560,60,4680,53.3C4800,47,4920,43,5040,35C5160,27,5280,13,5400,21.7C5520,30,5640,60,5760,71.7C5880,83,6000,77,6120,73.3C6240,70,6360,70,6480,58.3C6600,47,6720,23,6840,26.7C6960,30,7080,60,7200,60C7320,60,7440,30,7560,26.7C7680,23,7800,47,7920,48.3C8040,50,8160,30,8280,25C8400,20,8520,30,8580,35L8640,40L8640,100L8580,100C8520,100,8400,100,8280,100C8160,100,8040,100,7920,100C7800,100,7680,100,7560,100C7440,100,7320,100,7200,100C7080,100,6960,100,6840,100C6720,100,6600,100,6480,100C6360,100,6240,100,6120,100C6000,100,5880,100,5760,100C5640,100,5520,100,5400,100C5280,100,5160,100,5040,100C4920,100,4800,100,4680,100C4560,100,4440,100,4320,100C4200,100,4080,100,3960,100C3840,100,3720,100,3600,100C3480,100,3360,100,3240,100C3120,100,3000,100,2880,100C2760,100,2640,100,2520,100C2400,100,2280,100,2160,100C2040,100,1920,100,1800,100C1680,100,1560,100,1440,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z">
            </path>
        </svg>
        <div class="mission-vision-section w-100">
            <div class="decorative-circle circle-2"></div>
            <div class="container-fluid">
                <h2 class="section-title">{{lang.aboutUs?.titles?.ourMissionVision || ''}}</h2>
                <div class="row">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <div class="card-custom">
                            <i class="fas fa-rocket card-icon"></i>
                            <h3 class="card-title">{{lang.aboutUs?.titles?.mision || ''}}</h3>
                            <div class="card-text">
                                <p>{{ lang.aboutUs?.body?.misionDescription1 || ''}}  <span class="highlight">{{ lang.aboutUs?.body?.misionDescription2 || ''}}</span> {{ lang.aboutUs?.body?.misionDescription3 || ''}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card-custom">
                            <i class="fas fa-eye card-icon"></i>
                            <h3 class="card-title">{{lang.aboutUs?.titles?.vision || ''}}</h3>
                            <div class="card-text">
                                <p>{{ lang.aboutUs?.body?.visionDescription1 || ''}} <span class="highlight">{{lang.aboutUs?.body?.visionDescription2}}</span> {{lang.aboutUs?.body?.visionDescription3}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg id="wave2" style="transform:rotate(180deg); transition: 0.3s" viewBox="0 0 1440 100" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop>
                    <stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)"
                d="M0,40L30,35C60,30,120,20,180,18.3C240,17,300,23,360,23.3C420,23,480,17,540,21.7C600,27,660,43,720,51.7C780,60,840,60,900,56.7C960,53,1020,47,1080,38.3C1140,30,1200,20,1260,20C1320,20,1380,30,1440,43.3C1500,57,1560,73,1620,68.3C1680,63,1740,37,1800,31.7C1860,27,1920,43,1980,53.3C2040,63,2100,67,2160,56.7C2220,47,2280,23,2340,16.7C2400,10,2460,20,2520,35C2580,50,2640,70,2700,76.7C2760,83,2820,77,2880,61.7C2940,47,3000,23,3060,16.7C3120,10,3180,20,3240,23.3C3300,27,3360,23,3420,28.3C3480,33,3540,47,3600,53.3C3660,60,3720,60,3780,50C3840,40,3900,20,3960,18.3C4020,17,4080,33,4140,33.3C4200,33,4260,17,4290,8.3L4320,0L4320,100L4290,100C4260,100,4200,100,4140,100C4080,100,4020,100,3960,100C3900,100,3840,100,3780,100C3720,100,3660,100,3600,100C3540,100,3480,100,3420,100C3360,100,3300,100,3240,100C3180,100,3120,100,3060,100C3000,100,2940,100,2880,100C2820,100,2760,100,2700,100C2640,100,2580,100,2520,100C2460,100,2400,100,2340,100C2280,100,2220,100,2160,100C2100,100,2040,100,1980,100C1920,100,1860,100,1800,100C1740,100,1680,100,1620,100C1560,100,1500,100,1440,100C1380,100,1320,100,1260,100C1200,100,1140,100,1080,100C1020,100,960,100,900,100C840,100,780,100,720,100C660,100,600,100,540,100C480,100,420,100,360,100C300,100,240,100,180,100C120,100,60,100,30,100L0,100Z">
            </path>
        </svg>

        <div class="row fs-4">
            <h1 class="text text-center mt-5">{{lang.aboutUs?.titles?.ourHistory || ''}}</h1>
            <div class="col-12 mt-3">
                <Timeline />
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-section {
    padding: 6rem 0;
    font-family: var(--text-font-1);
    color: var(--text-color-1);
    overflow: hidden;
    margin-top: 60px;
}

.about-subtitle {
    color: var(--text-color-2);
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.about-title {
    color: var(--text-color-2);
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
}

.about-title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: var(--accent-color);
}

.about-text {
    color: var(--text-color-3);
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
}

.highlight {
    color: var(--accent-color) !important;
    font-weight: 500;
}

.image-container {
    position: relative;
    z-index: 1;
}

.image-container::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border: 4px solid var(--accent-color);
    z-index: -1;
    border-radius: 20px;
    transition: transform 0.3s ease;
}

.about-image {
    border-radius: 20px;
    box-shadow: 0 10px 30px var(--accent-color);
    transition: transform 0.3s ease;
}

.image-container:hover::before {
    transform: translate(10px, 10px);
}

.image-container:hover .about-image {
    transform: translate(-10px, -10px);
}

@media (max-width: 991px) {
    .about-section {
        padding: 4rem 0;
    }

    .about-content {
        text-align: center;
        margin-bottom: 3rem;
    }

    .about-title::after {
        left: 50%;
        transform: translateX(-50%);
    }

    .image-container {
        margin-top: 2rem;
    }
}



#wave2 {
    margin-top: -5px;
}

#containerAcercaDe {
    margin-top: 120px;
}

.mission-vision-section {
    background-color: var(--background-color);
    padding: 5rem 0;
    font-family: var(--text-font-1);
    position: relative;
    overflow: hidden;
    margin-top: -10px;
}

.section-title {
    color: var(--text-color-1);
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: var(--accent-color);
}

.card-custom {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid var(--accent-color);
    border-radius: 20px;
    padding: 2rem;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
}

.card-custom:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-custom::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--background-color-2);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
}

.card-custom:hover::before {
    transform: scaleX(1);
}

.card-icon {
    font-size: 3rem;
    color: var(--background-color-2);
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
}

.card-custom:hover .card-icon {
    transform: scale(1.1);
}

.card-title {
    color: var(--text-color-1);
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.card-text {
    color: var(--text-color-1);
    font-size: 1.1rem;
    line-height: 1.8;
}

.highlight {
    color: var(--background-color-2);
    font-weight: 500;
}

@media (max-width: 768px) {
    .card-custom {
        margin-bottom: 2rem;
    }
}

.decorative-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(252, 123, 11, 0.1);
}

.circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
}

.circle-2 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    right: -100px;
}
</style>