<script setup>
import Timeline from '../../components/timeLine/TimeLine.vue'
</script>

<template>
    <div class="row" id="containerAcercaDe">
        <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
            <div class="text-center offset-3">
                <p>Acerca de nosotros</p>
                <h1>Información relevante sobre la organización Apaza</h1>
                <p>Toda la información de lo que es Apaza</p>
            </div>
        </div>

        <div class="col-6 mt-5">
            <div>
                <!-- Al usar rutas desde public no hace falta poner el public, muestra un warning, para @ProfesorAlbino -->
                <img src="/Apaza/AcercaDe.png" alt="Logo" class="img-fluid" />
            </div>
        </div>
    </div>

    <section>

        <div class="row mt-5" id="containerMisionVision">

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
                <div class="text-center">
                    <h1 class="titulo">Nuestra Misión</h1>
                    <p>La misión de la organización Apaza es...</p>
                </div>
            </div>

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
                <div class="text-center">
                    <h1>Nuestra Vision</h1>
                    <p>La vision de la organización Apaza es...</p>
                </div>
            </div>
        </div>
    </section>

    <div class="row">
        <h1 class="text-center mt-5">Nuestra Historia</h1>
        <div class="col-12 mt-3">
            <Timeline />
        </div>
    </div>
</template>

<style scoped>
#containerAcercaDe {
    margin-top: 120px;
}

#containerMisionVision {
    background-color: var(--background-color-4);
}
</style>