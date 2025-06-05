<template>
    <Vue3Lottie :animation-data="empty" :height="300" :width="300"></Vue3Lottie>
</template>
<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import empty from '@/assets/empty.json'
</script>