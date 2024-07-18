<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<!-- <template>
  <header>
    <Navbar />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template> -->

<template>
  <div class="bg-white-400 h-screen">
    <Navbar />
  </div>
</template>