<script setup>
import wave from '../components/Wave.vue'
import CardImageRight from '../components/cards/CardImageRight.vue'
import CardImageLeft from '../components/cards/CardImageLeft.vue'
import CardFullImage from '../components/cards/CardFullImage.vue'
</script>

<template>
  <section>
    <wave class="mb-20" url="src/assets/APAZA_FONDO.jpg" title="" description="" />
  </section>

  <section>
    <CardImageRight title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
              mundo y con
              las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
              relacionarse
              con los demás, y pueden tener intereses y comportamientos repetitivos."
      url="src/assets/Fondo-pagina-principal.jpg" :order="false" />

    <CardImageLeft title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
              mundo y con
              las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
              relacionarse
              con los demás, y pueden tener intereses y comportamientos repetitivos."
      url="src/assets/Fondo-pagina-principal.jpg" :order="false" />
  </section>
</template>



<!-- <template>
  <section>
    <wave class="mb-20" url="src/assets/APAZA_FONDO.jpg" title="" description="" />

    <CardImageText title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
                mundo y con
                las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
                relacionarse
                con los demás, y pueden tener intereses y comportamientos repetitivos."
      url="src/assets/Fondo-pagina-principal.jpg" :order="false" />

    <CardImageText title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
                mundo y con
                las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
                relacionarse
                con los demás, y pueden tener intereses y comportamientos repetitivos."
      url="src/assets/Fondo-pagina-principal.jpg" :order="false" data-aos="fade-left" data-aos-offset="300"
      data-aos-easing="ease-in-sine" class="mb-5" />
  </section>

  <section id="sectionCards" class="a">

    <div class="custom-shape-divider-top-1721696071">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"></path>
      </svg>
    </div>

    <h1 id="title" class="text-6xl font-bold text-center" data-aos="fade-up" data-aos-duration="3000">Informacion sobre
      el autismo</h1>

    <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-40 ">
      <div class="col-span-1">
        <CardFullImage title="Recien Diagnosticado" url="src/assets/Fondo-pagina-principal.jpg"
          descriptionCard="Esta sección ofrece información y apoyo para personas que han recibido recientemente un diagnóstico de autismo"
          link="#" data-aos="fade-up" data-aos-duration="3000" />
      </div>
      <div class="col-span-1">
        <CardFullImage title="Personas con Autismo" url="src/assets/Fondo-pagina-principal.jpg" data-aos="fade-up"
          descriptionCard="En esta seccion se muestra informacion sobre el autismo y como se puede ayudar a las personas con autismo"
          link="#" data-aos-duration="3000" />
      </div>
      <div class="col-span-1">
        <CardFullImage title="Solicita Informacion" url="src/assets/Fondo-pagina-principal.jpg"
          descriptionCard="En esta seccion puedes comunicarte con nosotros para realizar sus consultas" link="#"
          data-aos="fade-up" data-aos-duration="3000" />
      </div>
    </div>

    <h1 id="title" class="text-6xl font-bold text-center mt-20" data-aos="fade-up" data-aos-duration="3000">Servicios y
      Eventos</h1>

    <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-40 ">
      <div class="col-span-1">
        <CardFullImage title="Nuestro Equipo" url="src/assets/Fondo-pagina-principal.jpg"
          descriptionCard="Aqui encontraras toda la informacion sobre nuestro equipo de trabajo" link="#"
          data-aos="fade-up" data-aos-duration="3000" />
      </div>
      <div class="col-span-1">
        <CardFullImage title="Colaboradores" url="src/assets/Fondo-pagina-principal.jpg" data-aos="fade-up"
          descriptionCard="Aqui encontraras toda la informacion sobre nuestros colaboradores" link="#"
          data-aos-duration="3000" />
      </div>
      <div class="col-span-1">
        <CardFullImage title="Actividades y Eventos" url="src/assets/Fondo-pagina-principal.jpg"
          descriptionCard="En esta seccion puedes informarte sobre proximos eventos y actividades" link="#"
          data-aos="fade-up" data-aos-duration="3000" />
      </div>
    </div>

    <div class="custom-shape-divider-bottom-1721776550">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"></path>
      </svg>
    </div>

  </section>

  <section>
    <h1 class="text-6xl font-bold text-center mt-20">"Ante Todo Persona"</h1>
  </section>
</template> -->

<style scoped>
#sectionCards {
  background-color: var(--primary-color);
  display: flex;

  padding: 10rem;
  position: relative;
  height: 200%;
  color: var(--text-color-1);
  font-family: var(--text-font-1);

  display: flex;
  flex-direction: column;
}

#title {
  color: var(--text-color-1);
  font-family: var(--text-font-1);
}

.custom-shape-divider-top-1721696071 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-top-1721696071 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 84px;
}

.custom-shape-divider-top-1721696071 .shape-fill {
  fill: var(--background-color-3);
}

.custom-shape-divider-bottom-1721776550 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1721776550 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 131px;
}

.custom-shape-divider-bottom-1721776550 .shape-fill {
  fill: #FFFFFF;
}
</style>