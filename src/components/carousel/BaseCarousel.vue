<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});

const currentIndex = ref(0);
const carouselRef = ref(null);
let autoSlideInterval = null;

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1;
};

// const goToSlide = (index) => {
//     currentIndex.value = index;
//     // Reiniciar el auto-slide cuando se cambia manualmente
//     if (autoSlideInterval) {
//         stopAutoSlide();
//         startAutoSlide();
//     }
// };

const startAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextSlide, 10000);
};

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
});

// Pausar auto-slide al hacer hover
const handleMouseEnter = () => {
    stopAutoSlide();
};

const handleMouseLeave = () => {
    startAutoSlide();
};

// Manejar navegación por teclado
const handleKeydown = (event) => {
    if (event.key === 'ArrowRight') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    }
};
</script>

<template>
    <div 
        ref="carouselRef"
        class="carousel-container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @keydown="handleKeydown"
        tabindex="0"
        role="region"
        aria-label="Carrusel de imágenes"
    >
        <!-- Contenedor principal de imágenes -->
        <div class="carousel-track">
            <div 
                v-for="(image, index) in images" 
                :key="index"
                :class="['carousel-slide', { 'active': index === currentIndex }]"
                :aria-hidden="index !== currentIndex"
            >
                <img 
                    :src="image" 
                    :alt="`Imagen ${index + 1} de ${images.length}`"
                    class="carousel-image"
                    loading="lazy"
                >
                <div class="slide-overlay"></div>
            </div>
        </div>

        <!-- Controles de navegación -->
        <button 
            class="carousel-control prev"
            @click="prevSlide"
            aria-label="Imagen anterior"
            :disabled="images.length <= 1"
        >
            <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>

        <button 
            class="carousel-control next"
            @click="nextSlide"
            aria-label="Siguiente imagen"
            :disabled="images.length <= 1"
        >
            <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>

        <!-- Indicadores -->
        <!-- <div class="carousel-indicators" role="tablist">
            <button
                v-for="(image, index) in images"
                :key="`indicator-${index}`"
                :class="['indicator', { 'active': index === currentIndex }]"
                @click="goToSlide(index)"
                :aria-label="`Ir a imagen ${index + 1}`"
                :aria-selected="index === currentIndex"
                role="tab"
            >
                <span class="indicator-progress" v-if="index === currentIndex"></span>
            </button>
        </div> -->

        <!-- Contador de imágenes -->
        <!-- <div class="carousel-counter" aria-live="polite">
            {{ currentIndex + 1 }} / {{ images.length }}
        </div> -->
    </div>
</template>

<style scoped>
.carousel-container {
    position: relative;
    width: 100%;
    height: 60vh;
    min-height: 300px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.08);
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-container:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.15),
        0 12px 24px rgba(0, 0, 0, 0.12);
}

.carousel-container:focus {
    outline: 3px solid linear-gradient(45deg, var(--primary-color), var(--background-color));;
    outline-offset: 2px;
}

.carousel-track {
    position: relative;
    width: 100%;
    height: 100%;
}

.carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(1.1);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
}

.carousel-slide.active {
    opacity: 1;
    transform: scale(1);
    z-index: 2;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(0, 0, 0, 0.05);
}

.carousel-container:hover .carousel-image {
    transform: scale(1.05);
}

.slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 50%,
        rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
}

/* Controles de navegación */
.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    color: #333;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.carousel-container:hover .carousel-control {
    opacity: 1;
    visibility: visible;
}

.carousel-control:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.carousel-control:active {
    transform: translateY(-50%) scale(0.95);
}

.carousel-control:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

.carousel-control.prev {
    left: 20px;
}

.carousel-control.next {
    right: 20px;
}

.control-icon {
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
}

/* Indicadores */
.carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 24px;
}

.indicator {
    position: relative;
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.indicator:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.1);
}

.indicator.active {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.2);
}

.indicator-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    border-radius: 50%;
    animation: progress-fill 10s linear infinite;
}

@keyframes progress-fill {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    10% {
        transform: scale(0.3);
        opacity: 0.7;
    }
    90% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.1);
        opacity: 0;
    }
}

/* Reiniciar animación cuando cambia el slide */
.indicator.active .indicator-progress {
    animation: progress-fill 10s linear;
}

/* Contador */
.carousel-counter {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    color: white;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10;
    letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .carousel-container {
        height: 50vh;
        min-height: 250px;
        border-radius: 16px;
    }
    
    .carousel-control {
        width: 40px;
        height: 40px;
        opacity: 1;
        visibility: visible;
    }
    
    .carousel-control.prev {
        left: 15px;
    }
    
    .carousel-control.next {
        right: 15px;
    }
    
    .control-icon {
        width: 20px;
        height: 20px;
    }
    
    .carousel-indicators {
        bottom: 15px;
        padding: 6px 12px;
    }
    
    .indicator {
        width: 10px;
        height: 10px;
    }
    
    .carousel-counter {
        top: 15px;
        right: 15px;
        padding: 6px 12px;
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .carousel-container {
        height: 40vh;
        min-height: 200px;
        border-radius: 12px;
    }
    
    .carousel-control {
        width: 36px;
        height: 36px;
    }
    
    .carousel-control.prev {
        left: 10px;
    }
    
    .carousel-control.next {
        right: 10px;
    }
    
    .control-icon {
        width: 18px;
        height: 18px;
    }
    
    .carousel-indicators {
        bottom: 10px;
        gap: 6px;
    }
    
    .indicator {
        width: 8px;
        height: 8px;
    }
    
    .carousel-counter {
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        font-size: 11px;
    }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
    .carousel-slide,
    .carousel-image,
    .carousel-control,
    .indicator {
        transition: none;
    }
    
    .indicator-progress {
        animation: none;
    }
}

/* Estados de enfoque mejorados */
.carousel-control:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}

.indicator:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}

/* Efectos de carga */
.carousel-image {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
}

.carousel-image[src] {
    background: rgba(0, 0, 0, 0.05);
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Hover mejorado para dispositivos táctiles */
@media (hover: hover) {
    .carousel-container:hover .carousel-control {
        opacity: 1;
        visibility: visible;
    }
}

/* Estilos para modo oscuro */
@media (prefers-color-scheme: dark) {
    .carousel-counter {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .carousel-indicators {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .indicator {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .indicator.active {
        background: rgba(255, 255, 255, 0.8);
    }
}
</style>