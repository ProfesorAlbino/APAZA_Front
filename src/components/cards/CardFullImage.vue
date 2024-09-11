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
    <div id="card"
        class="relative grid h-80 w-full max-w-lg overflow-hidden rounded-xl bg-white text-center text-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <article class="card__article">
            <div :style="{ backgroundImage: `url(${props.url})` }"
                class="absolute inset-0 h-full w-full bg-cover bg-center">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>

            <div class="relative p-6">
                <h2 class="mb-6 text-4xl font-medium text-white">{{ title }}</h2>
            </div>

            <div
                class="card__data absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 ease-in-out">
                <span class="block text-gray-600 mb-2">{{ descriptionCard }}</span>
                <a :href="link" class="text-blue-500 hover:text-blue-600 transition-colors">Mas informacion</a>
            </div>
        </article>
    </div>
</template>

<style scoped>
#card {
    margin-inline: 1.5rem;
}

.card__article {
    position: relative;
    overflow: hidden;
}

.card__article:hover .card__data {
    opacity: 1;
    bottom: 2rem;
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.card__data {
    bottom: -6rem;
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

@media screen and (max-width: 340px) {
    .container {
        margin-inline: 1rem;
    }

    .card__data {
        width: 250px;
        padding: 1rem;
    }
}

/* For medium devices */
@media screen and (min-width: 768px) {
    .card__container {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.5rem;
    }
}

/* For large devices */
@media screen and (min-width: 1120px) {
    .container {
        height: 100vh;
    }

    .card__container {
        grid-template-columns: repeat(3, 1fr);
    }

    .card__data {
        width: 316px;
        padding-inline: 2.5rem;
    }
}
</style>
