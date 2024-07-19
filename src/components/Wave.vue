<script>
export default {
    props: {
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
    }
};
</script>

<template>
    <section id="container">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>

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
    background-color: var(--background-color-3);
    padding: 20rem;
    position: relative;
    height: 200%;
    background-image: url('../assets/Fondo-pagina-principal.jpg');
    color: var(--text-color-1);
    font-family: var(--text-font-1);
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