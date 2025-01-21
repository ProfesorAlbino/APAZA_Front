<script setup>
import Navbar from '@/components/templates/Navbar.vue'
import Footer from '@/components/templates/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen container-user">
    <Navbar />
    <main class="container-fluid p-0">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
.container-user {
background-color: var(--background-color-3)
}

main{
  margin-top: 2%;
}

main {
    overflow-x: hidden;
  }
</style>