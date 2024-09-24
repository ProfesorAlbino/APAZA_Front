<script setup>
import Timeline from '../../components/timeLine/Timeline.vue'
</script>

<template>
    <div class="row" id="containerAcercaDe">
        <!-- Mover el contenido más a la derecha y centrar el texto en el medio del div -->
        <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
            <div class="text-center offset-3">
                <p>Acerca de nosotros</p>
                <h1>Informacion relevante sobre la organizacion Apaza</h1>
                <p>Toda la informacion de lo que es Apaza</p>
            </div>
        </div>

        <div class="col-6 mt-5">
            <div>
                <img src="/public/Apaza/AcercaDe.png" alt="Logo" class="img-fluid" />
            </div>
        </div>
    </div>

    <section>

        <div class="row mt-5" id="containerMisionVision">

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
                <div class="text-center">
                    <h1 class="titulo">Nuestra Mision</h1>
                    <p>La mision de la organizacion Apaza es...</p>
                </div>
            </div>

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
                <div class="text-center">
                    <h1>Nuestra Vision</h1>
                    <p>La vision de la organizacion Apaza es...</p>
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