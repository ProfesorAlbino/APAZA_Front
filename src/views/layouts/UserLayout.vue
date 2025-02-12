<script setup>
import OffcanvasNav from '@/components/templates/OffcanvasNav.vue';
//import Navbar from '@/components/templates/NavbarComponent.vue'
import Footer from '@/components/templates/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen container-user">
    <OffcanvasNav />
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