<script setup>
import { computed } from 'vue';

// Definir propiedades (props)
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    order: {
        type: Boolean,
        required: true,
    },
});

console.log(props.url);
</script>

<template>
    <div
        class="flex flex-col-reverse md:flex-row items-center justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0 mb-20">
        <img v-if="order" :src="url" alt="Logo" class="w-65 h-80 order-1 md:order-1" />
        <img v-else :src="url" alt="Logo" class="w-65 h-80 order-1 md:order-2" />

        <div v-if="order" class="container mx-auto max-w-2xl p-4 order-2 md:order-2">
            <h1 class="text-4xl text-center mb-4">{{ title }}</h1>
            <p class="text-2xl leading-relaxed">
                {{ description }}
            </p>
        </div>

        <div v-else class="container mx-auto max-w-2xl p-4 order-2 md:order-1">
            <h1 class="text-4xl text-center mb-4">{{ title }}</h1>
            <p class="text-2xl leading-relaxed">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<style scoped>
h1 {
    color: var(--text-color-2);
    font-family: var(--text-font-2);
}

p {
    color: var(--text-color-3);
    font-family: var(--text-font-2);
    text-align: justify;

}
</style>