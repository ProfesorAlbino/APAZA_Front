<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <Navbar />
    </header>

    <main class="flex-grow">
      <nav>
        <RouterLink to="/" />
      </nav>
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style>
body {
  @apply bg-[var(--background-color-3)];
}
</style>
