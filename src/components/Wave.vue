<script setup>
const props = defineProps({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
</script>



<template>
    <section
        class="vh-100 d-flex align-items-center justify-content-center text-center text-white position-relative overflow-hidden"
        :style="{ backgroundImage: `url(${props.url})`, backgroundPosition: 'center' }">
        <div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h1 class="display-4 mb-3">{{ title }}</h1>
                    <p class="lead">{{ description }}</p>
                </div>
            </div>
        </div>

        <div class="custom-shape-divider-bottom-1721350035">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    class="shape-fill"></path>
            </svg>
        </div>
    </section>


</template>

<style scoped>
#container {
    padding: 20rem;
    position: relative;
    height: 500px;
    color: var(--text-color-1);
    font-family: var(--text-font-1);
    z-index: -1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.custom-shape-divider-bottom-1721350035 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1721350035 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
}

.custom-shape-divider-bottom-1721350035 .shape-fill {
    fill: var(--background-color-3);
}
</style>