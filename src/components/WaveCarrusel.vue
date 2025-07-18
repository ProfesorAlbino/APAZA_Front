<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  interval: {
    type: Number,
    default: 30000 // 30 segundos
  }
})

const currentIndex = ref(0)
const isTransitioning = ref(false)
let intervalId = null

const nextSlide = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 1000)
}

const goToSlide = (index) => {
  if (isTransitioning.value || index === currentIndex.value) return
  
  isTransitioning.value = true
  currentIndex.value = index
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 1000)
}

onMounted(() => {
  if (props.images.length > 1) {
    intervalId = setInterval(nextSlide, props.interval)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <section
    class="custom-height d-flex align-items-center justify-content-center text-center position-relative overflow-hidden carousel-hero"
  >
    <!-- Carrusel de imágenes de fondo -->
    <div class="carousel-container">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="carousel-slide"
        :class="{ 
          'active': index === currentIndex,
          'transitioning': isTransitioning
        }"
        :style="{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      >
        <!-- Overlay gradient -->
        <div class="carousel-overlay"></div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="hero-content">
      <div class="row justify-content-center">
        <div class="d-flex flex-column align-items-center justify-content-evenly content-wrapper">
          <h1 class="display-4 mb-3 hero-title">{{ title }}</h1>
          <div class="logo-container">
            <img src="/Apaza/.webp/apaza_logo.webp" alt="Apaza Logo" class="hero-logo"/>
          </div>
          <p class="lead mt-3 hero-description">{{ description }}</p>
        </div>
      </div>
    </div>

    <!-- Indicadores del carrusel -->
    <div class="carousel-indicators" v-if="images.length > 1">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="carousel-indicator"
        :class="{ 'active': index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Ir a imagen ${index + 1}`"
      >
        <span class="indicator-progress" v-if="index === currentIndex"></span>
      </button>
    </div>

    <!-- Navegación del carrusel -->
    <div class="carousel-nav" v-if="images.length > 1">
      <button 
        class="carousel-nav-btn prev" 
        @click="goToSlide((currentIndex - 1 + images.length) % images.length)"
        :disabled="isTransitioning"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button 
        class="carousel-nav-btn next" 
        @click="nextSlide"
        :disabled="isTransitioning"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Forma decorativa inferior -->
    <div class="custom-shape-divider-bottom-1721350035">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Alturas responsivas */
@media (min-width: 769px) {
  .custom-height {
    min-height: 100vh;
  }
}
@media (max-width: 768px) {
  .custom-height {
    min-height: 70vh;
  }
}

/* Estructura del carrusel */
.carousel-hero {
  position: relative;
  z-index: 1;
}

.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.4, 0.0, 0.2, 1);
  transform: scale(1.1);
  animation: ken-burns 30s linear infinite;
}

.carousel-slide.active {
  opacity: 1;
  z-index: 1;
}

.carousel-slide.transitioning {
  transition: opacity 1s cubic-bezier(0.4, 0.0, 0.2, 1), transform 1s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  backdrop-filter: blur(0.5px);
}

@keyframes ken-burns {
  0% { transform: scale(1.1) rotate(0deg); }
  25% { transform: scale(1.2) rotate(0.5deg); }
  50% { transform: scale(1.15) rotate(0deg); }
  75% { transform: scale(1.25) rotate(-0.5deg); }
  100% { transform: scale(1.1) rotate(0deg); }
}

/* Contenido principal */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 2rem;
  color: var(--text-color-1);
}

.content-wrapper {
  animation: fadeInUp 1.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  animation: titleGlow 3s ease-in-out infinite alternate;
  color: var(--text-color-1);
}

@keyframes titleGlow {
  from {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }
  to {
    text-shadow: 2px 2px 16px rgba(0, 0, 0, 0.9), 0 0 20px rgba(var(--white-color-rgb), 0.3);
  }
}

.logo-container {
  position: relative;
  animation: logoFloat 4s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid var(--white-color);
  box-shadow: 
    4px 4px 15px rgba(0, 0, 0, 0.6), 
    -4px -4px 15px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(var(--white-color-rgb), 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.hero-logo:hover {
  transform: scale(1.05);
  box-shadow: 
    6px 6px 20px rgba(0, 0, 0, 0.8), 
    -6px -6px 20px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(var(--white-color-rgb), 0.4);
}

.hero-description {
  font-family: 'Rubik 80s Fade', serif !important;
  font-weight: 400;
  font-style: normal;
  font-size: 1.9rem;
  color: var(--text-color-1);
  filter: drop-shadow(4px 4px 10px var(--background-color));
  animation: textShimmer 2s ease-in-out infinite alternate;
}

@keyframes textShimmer {
  from {
    filter: drop-shadow(4px 4px 10px var(--background-color));
  }
  to {
    filter: drop-shadow(4px 4px 15px var(--background-color)) drop-shadow(0 0 10px rgba(var(--white-color-rgb), 0.2));
  }
}

@media (max-width: 768px) {
  .hero-description {
    margin-top: 20px;
    font-weight: 200;
    font-size: 1.5rem;
  }
}

/* Indicadores del carrusel - Adaptados al sistema de colores */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.carousel-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(var(--white-color-rgb), 0.8);
  background: rgba(var(--black-color-rgb), 0.4);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(2px);
}

.carousel-indicator:hover {
  border-color: var(--white-color);
  background: rgba(var(--white-color-rgb), 0.2);
  transform: scale(1.2);
}

.carousel-indicator.active {
  border-color: var(--white-color);
  background: rgba(var(--white-color-rgb), 0.9);
  box-shadow: 
    0 0 15px rgba(var(--white-color-rgb), 0.8),
    0 0 30px rgba(var(--primary-color-rgb), 0.5);
}

.indicator-progress {
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: conic-gradient(
    from 0deg,
    var(--background-color-2) 0deg,
    var(--primary-color) 180deg,
    var(--background-color-2) 360deg
  );
  border-radius: 50%;
  animation: indicatorProgress 30s linear infinite;
  opacity: 0.9;
}

@keyframes indicatorProgress {
  0% { 
    transform: scale(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% { 
    transform: scale(1) rotate(360deg);
    opacity: 0.9;
  }
}

/* Navegación del carrusel - Adaptada al sistema de colores */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 3;
  pointer-events: none;
}

.carousel-nav-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(var(--white-color-rgb), 0.3);
  background: rgba(var(--black-color-rgb), 0.3);
  color: var(--white-color);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  pointer-events: auto;
}

.carousel-nav-btn:hover:not(:disabled) {
  background: rgba(var(--white-color-rgb), 0.2);
  border-color: rgba(var(--white-color-rgb), 0.6);
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(var(--black-color-rgb), 0.3);
}

.carousel-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modo oscuro - Navegación */
body.dark-mode .carousel-nav-btn {
  background: rgba(var(--background-color-5), 0.6);
  border-color: rgba(var(--text-color-1-rgb), 0.4);
}

body.dark-mode .carousel-nav-btn:hover:not(:disabled) {
  background: rgba(var(--background-color-6), 0.8);
  border-color: rgba(var(--text-color-1-rgb), 0.7);
}

@media (max-width: 768px) {
  .carousel-nav-btn {
    width: 40px;
    height: 40px;
  }
  
  .carousel-nav {
    padding: 0 10px;
  }
}

/* Forma decorativa inferior */
.custom-shape-divider-bottom-1721350035 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  z-index: 2;
}

.custom-shape-divider-bottom-1721350035 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;
  filter: drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.2));
}

@media (max-width: 768px) {
  .custom-shape-divider-bottom-1721350035 svg {
    height: 75px;
  }
}

.custom-shape-divider-bottom-1721350035 .shape-fill {
  fill: var(--background-color-3);
}

/* Animaciones de entrada con retardo */
.hero-title {
  animation-delay: 0.2s;
}

.logo-container {
  animation-delay: 0.4s;
}

.hero-description {
  animation-delay: 0.6s;
}

.carousel-indicators {
  animation: fadeInUp 1s cubic-bezier(0.4, 0.0, 0.2, 1) 0.8s both;
}

.carousel-nav {
  animation: fadeInUp 1s cubic-bezier(0.4, 0.0, 0.2, 1) 1s both;
}

/* Efectos especiales para modo oscuro */
body.dark-mode .carousel-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

body.dark-mode .hero-title {
  color: var(--text-color-1);
}

body.dark-mode .hero-description {
  color: var(--text-color-1);
  filter: drop-shadow(4px 4px 10px var(--background-color));
}

body.dark-mode .indicator-progress {
  background: linear-gradient(45deg, var(--background-color-2), var(--color-active-dark));
}

/* Mejoras adicionales para accesibilidad */
.carousel-indicator:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.carousel-nav-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Animación de pulsación para indicadores activos */
.carousel-indicator.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 
      0 0 15px rgba(var(--white-color-rgb), 0.8),
      0 0 30px rgba(var(--primary-color-rgb), 0.5),
      0 0 0 0 rgba(var(--background-color-2-rgb), 0.7);
  }
  70% {
    box-shadow: 
      0 0 15px rgba(var(--white-color-rgb), 0.8),
      0 0 30px rgba(var(--primary-color-rgb), 0.5),
      0 0 0 10px rgba(var(--background-color-2-rgb), 0);
  }
  100% {
    box-shadow: 
      0 0 15px rgba(var(--white-color-rgb), 0.8),
      0 0 30px rgba(var(--primary-color-rgb), 0.5),
      0 0 0 0 rgba(var(--background-color-2-rgb), 0);
  }
}

/* Hover mejorado para mejor UX */
.carousel-indicator:hover {
  background: rgba(var(--white-color-rgb), 0.3);
}

body.dark-mode .carousel-indicator {
  border-color: rgba(var(--text-color-1-rgb), 0.8);
  background: rgba(var(--background-color-5-rgb), 0.6);
}

body.dark-mode .carousel-indicator:hover {
  background: rgba(var(--color-active-dark-rgb), 0.3);
  border-color: var(--text-color-1);
}

body.dark-mode .carousel-indicator.active {
  border-color: var(--text-color-1);
  background: rgba(var(--text-color-1-rgb), 0.9);
  box-shadow: 
    0 0 15px rgba(var(--text-color-1-rgb), 0.8),
    0 0 30px rgba(var(--color-active-dark-rgb), 0.5);
}

body.dark-mode .indicator-progress {
  background: conic-gradient(
    from 0deg,
    var(--background-color-2) 0deg,
    var(--color-active-dark) 180deg,
    var(--background-color-2) 360deg
  );
}
</style>