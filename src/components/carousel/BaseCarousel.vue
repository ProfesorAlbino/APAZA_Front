<script setup>
defineProps({
    images: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div id="carouselFade" class="carousel slide carousel-fade">
        <div class="carousel-inner">
            <div v-for="(image, index) in images" :key="index" :class="['carousel-item', {'active': index === 0}]">
                <img :src="image" class="d-block img" alt="imagen">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
        </button>
    </div>
</template>

<style scoped>
.img {
    height: 60vh;
    width: 100%;
    /* object-fit: cover; */
}
</style>