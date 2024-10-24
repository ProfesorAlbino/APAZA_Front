<script setup>
import Navbar from '@/components/templates/Navbar.vue'
import Footer from '@/components/templates/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="container-fluid p-0">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>