<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { setProductionMode } from '@/config/BasicConfig';

const isAuthenticated = ref(false);

onMounted(() => {
  //const userRole = localStorage.getItem('userRole')
  const userRole = 'user';
  isAuthenticated.value = !!userRole;

  if (window.location.hostname !== 'localhost') {
    setProductionMode();
  }
})
</script>

<template>
  <RouterView />
</template>

<style>
body {
  @apply bg-[var(--background-color-3)];
}
</style>