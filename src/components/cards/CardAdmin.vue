<template>
  <div
    class="card d-flex flex-column justify-content-center align-items-center wow fadeInUp text-center rounded py-5 py-md-1 px-4 px-md-3 mx-lg-2"
    data-wow-delay="0.1s"
  >
    <component :is="icon" class="icon mb-3"></component>
    <h5 class="mb-3">{{ props.title }}</h5>
    <p class="m-0">{{ props.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.container {
  text-decoration: none;
  cursor: pointer;
}

.card {
  cursor: pointer;
  color: var(--black-color);
  height: 200px;
  transition: 0.5s;
  box-shadow: 0 0 10px rgba(var(--black-color-rgb), 0.4);
}

.card * {
  transition: 0.2s;
}
@media (min-width: 772px) and (max-width: 880px) {
  h5,
  p {
    font-size: .9rem;
  }
}

.card:hover,
svg:hover {
  color: var(--primary-color) !important;
}
svg {
  flex-shrink: 0;
  fill: var(--black-color);
}
</style>
