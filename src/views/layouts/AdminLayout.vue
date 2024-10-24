<script setup>
import SideBar from '@/components/templates/SideBar.vue'
// import Footer from '@/components/templates/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <SideBar />
    
    <div class="w-[calc(100%-250px)] ml-[250px]" id="container">
      <main class="container-fluid">
        <RouterView />
      </main>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<style>
#container {
  margin-left: 16rem;
}
</style>