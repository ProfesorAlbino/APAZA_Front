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
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
}

.container-fluid {
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: var(--background-color-4);
}

main {
  background-color: var(--background-color-4);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-wrapper {
    margin-left: 0;
  }
}
</style>