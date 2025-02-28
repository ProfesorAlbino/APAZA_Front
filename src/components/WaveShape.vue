<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section
    class="custom-height d-flex align-items-center justify-content-center text-center text-white position-relative overflow-hidden bg-size"
    :style="{
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${props.url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }"
  >
    <div>
      <div class="row justify-content-center">
        <div class="d-flex flex-column align-items-center justify-content-evenly">
            <h1 class="display-4 mb-3">{{ title }}</h1>
            <img src="/Apaza/.webp/apaza_logo.webp" alt="" class="p-3"/>
            <p class="lead mt-3">{{ description }}</p>
          </div>
      </div>
    </div>

    <div class="custom-shape-divider-bottom-1721350035">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 769px) {
  .custom-height {
    min-height: 100vh;
  }
}
@media (max-width: 768px) {
  .custom-height {
    min-height: 70vh;
  }
}
.custom-shape-divider-bottom-1721350035 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1721350035 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;

  @media (max-width: 768px) {
    height: 75px;
  }
}

.custom-shape-divider-bottom-1721350035 .shape-fill {
  fill: var(--background-color-3);
}

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid var(--white-color);
  box-shadow: 4px 4px 10px rgba(0,0,0, 0.500), -4px -4px 10px rgba(0,0,0, 0.500); 
}

.lead {
  font-family: 'Rubik 80s Fade', serif !important;
  font-weight: 400;
  font-style: normal;
  font-size: 1.9rem;
  color: #fff;
  filter: drop-shadow(4px 4px 10px var(--background-color));

  @media (max-width: 768px) {
    margin-top: 85%;
    font-weight: 200;
    font-size: 1.5rem;
  }
}
</style>
