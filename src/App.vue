<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const isAuthenticated = ref(false)

onMounted(() => {
  //const userRole = localStorage.getItem('userRole')
  const userRole = 'user'
  isAuthenticated.value = !!userRole
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