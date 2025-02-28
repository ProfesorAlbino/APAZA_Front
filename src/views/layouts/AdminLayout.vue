<script setup>
import SideBar from '@/components/templates/SideBar.vue'
// import Footer from '@/components/templates/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <SideBar />
    
    <div class="main-wrapper ml-250">
      <main class="container-fluid mt-0 gx-0">
        <RouterView />
      </main>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  width: calc(100%-250px);
}
.ml-250{
  margin-left: 250px;
}
main{
  background-color: #edf2f9;
}

@media (max-width: 768px) {
    .ml-250 {
      margin-left: 0%;
    }
}
</style>