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
            <!-- <div class="carousel-item active">
                <img src="..." class="d-block w-100" alt="...">
            </div> -->
            <div v-for="(image, index) in images" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
                <img :src="image" class="d-block w-100 img" alt="imagen">
            </div>
            <!-- <div v-if="images.length === 0" class="card-text placeholder-glow ratio ratio-16x9 bg-secondary w-100 placeholder col-12" style="height: 60vh; object-fit: cover;">
            </div> -->
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
    object-fit: cover;
}
</style>