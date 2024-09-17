<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    descriptionCard: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="image">
                    <img :src="url" :alt="title">
                    <div id="container_text">
                        <h2>{{ title }}</h2>
                        <p>{{ descriptionCard }}</p>
                        <a :href="link" class="btn btn-light mt-2">Más información</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image {
    overflow: hidden;
    height: 300px;
    width: 300px;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 25px 1px rgba(0, 0, 0, .3);
    transition: .5s;
    background-color: #000;
    /* Fondo oscuro para el efecto de gradiente */
}

.image::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    transform: translate(-140%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    /* Fondo semi-transparente para el texto */
    opacity: 0.8;
    border-radius: 50%;
    transition: .8s;
}

.image:hover::after {
    transform: translate(-50%, -50%);
}

.image:hover img {
    transform: translate(-50%, -50%) scale(1.3) rotate(20deg);
}

img {
    position: absolute;
    height: 110%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .8s;
}

#container_text {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-200%, -50%);
    color: #fff;
    text-align: center;
    transition: .8s;
    transition-timing-function: ease-in;
    width: 80%;
}

.image:hover #container_text {
    transform: translate(-50%, -50%);
    transition-timing-function: ease;
}
</style>