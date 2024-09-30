<script setup>
import Timeline from '../../components/timeLine/TimeLine.vue'
</script>

<template>
    <div class="row fs-4" id="containerAcercaDe">
        <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
            <div class="text-center offset-3">
                <p>Acerca de nosotros</p>
                <h1>Nuestros Orígenes</h1>
                <p>Desde nuestras raíces como un pequeño grupo de familias unidas por el amor y la esperanza,
                    hemos crecido con un solo objetivo: mejorar la calidad de vida de nuestros hijos con autismo.
                    Hoy, gracias al apoyo de organizaciones como ACOTEAMA y a la fuerza de nuestra comunidad,
                    seguimos construyendo juntos un futuro lleno de inclusión, comprensión y oportunidades para todos.
                </p>
            </div>
        </div>

        <div class="col-6 mt-5">
            <div>
                <img src="/Apaza/AcercaDe.png" alt="Logo" class="img-fluid" />
            </div>
        </div>
    </div>

    <section>

        <div class="row mt-5 fs-4" id="containerMisionVision">

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center mt-5 mb-5" id="containerText">
                <div class="text-center">
                    <h1 class="titulo">Nuestra Misión</h1>
                    <p>Comprometidos en fortalecer todas las capacidades de las personas con Trastorno
                        del Espectro Autista, con respeto y tolerancia, trabajando en equipo en la defensa y
                        promoción de sus derechos para tener así una participación más solidaria y justa en
                        la sociedad</p>
                </div>
            </div>

            <div class="col-6 ms-auto d-flex align-items-center justify-content-center" id="containerText">
                <div class="text-center">
                    <h1>Nuestra Vision</h1>
                    <p>Mejorar la calidad de vida de las personas con autismo y sus familias. Creando desde
                        su inicio un espacio formador, donde se brinden las herramientas necesarias para la
                        inclusión en la sociedad de una manera efectiva.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="row fs-4">
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