<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
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

function goToEventPage(link) {
    router.push(link);
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card-container">
                    <div class="image">
                        <img :src="url" :alt="title">
                        <h2 class="card-title">{{ title }}</h2>
                        <div id="container_text">
                            <p>{{ descriptionCard }}</p>
                            <a @click="goToEventPage(link)" class="btn btn-light mt-2">Más información</a>
                        </div>
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

.card-container {
    position: relative;
    width: 300px;
}

.card-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: var(--text-color-1);
    background-color: rgba(0, 0, 0, 0);
    padding: 10px 5px;
    margin: 0;
    z-index: 3;
    font-size: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.image {
    overflow: hidden;
    height: 300px;
    width: 300px;
    position: relative;
    cursor: pointer;
    transition: .5s;
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
    background-color: var(--background-color-2);
    opacity: 0.5;
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
    color: var(--text-color-1);
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