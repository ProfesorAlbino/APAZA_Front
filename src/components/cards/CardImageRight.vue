<script setup>

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
    }
});

</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center align-items-center">
            <div class="row align-items-center">
                <div class="col-md-6 mb-4 mb-md-0">
                    <img :src="url" alt="Logo" class="img-fluid" />
                </div>
                <div class="col-md-6">
                    <div class="text-center text-md-start">
                        <h1 class="display-4 mb-4 text-center">{{ title }}</h1>
                        <p class="lead fs-4">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>
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