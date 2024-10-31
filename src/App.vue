<script setup>
import { onMounted} from 'vue'
import { RouterView } from 'vue-router'
import { setProductionMode } from '@/config/BasicConfig';

onMounted(() => {

  if (window.location.hostname !== 'localhost') {
    setProductionMode();
  }
})
</script>

<template>
  <RouterView />
</template>