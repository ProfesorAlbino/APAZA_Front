<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>

  <header>
    <Navbar />
  </header>

  <body>
    <nav>
      <RouterLink to="/" />
    </nav>
  </body>


  <RouterView />
</template>

<style>
body {
  background-color: var(--background-color-3);
}
</style>