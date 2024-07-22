<script setup>
import wave from '../components/Wave.vue'
import CardImageText from '../components/CardImageText.vue'
</script>

<template>
  <wave class="mb-20" url="../assets/Fondo-pagina-principal.jpg" title="Pagina principal APAZA" description="Prueba" />

  <CardImageText title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
                mundo y con
                las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
                relacionarse
                con los demás, y pueden tener intereses y comportamientos repetitivos."
    url="src/assets/Fondo-pagina-principal.jpg" :order="true" />

  <CardImageText title="¿Que es el autismo?" description="El autismo es un trastorno del desarrollo que afecta la forma en que una persona se relaciona con el
                mundo y con
                las personas que lo rodean. Las personas con autismo pueden tener dificultades para comunicarse y
                relacionarse
                con los demás, y pueden tener intereses y comportamientos repetitivos."
    url="src/assets/Fondo-pagina-principal.jpg" :order="false" />

</template>