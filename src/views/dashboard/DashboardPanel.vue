<template>
  <div class="d-flex flex-column min-vh-100 custom-bg">
    <div class="d-flex justify-content-center mt-5">
      <h2>{{ lang?.dashboard?.titles?.welcome }}</h2>
    </div>
    <div class="container mt-4">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-7">
          <div class="row mt-4 mt-md-0">
            <div class="col-7 ps-4 pe-2 mb-3">
              <div class="parent rounded">
                <div class="overlay"></div>
                <img class="rounded aos aos-init aos-animate" data-aos="fade-right" data-aos-delay="200" width="227"
                  height="162" data-aos-duration="1000" data-aos-easing="ease-in-out"
                  src="../../assets/imgwebp/apaza4.jpg" alt="">
              </div>
            </div>

            <div class="col-5 align-self-end ps-2 mb-3">
              <div class="parent rounded">
                <div class="overlay"></div>
                <img class="rounded aos aos-init aos-animate" data-aos="fade-down" data-aos-delay="200"
                  data-aos-duration="1000" src="../../assets/imgwebp/apaza.jpg" alt="">
              </div>
            </div>
            <div class="col-5 offset-1 px-2 mb-3">
              <div class="parent rounded">
                <div class="overlay"></div>
                <img class="rounded aos aos-init aos-animate" data-aos="fade-up" data-aos-delay="300"
                  data-aos-duration="1500" src="../../assets/imgwebp/apaza5.jpg" alt="">
              </div>
            </div>
            <div class="col-5 px-2 mb-3">
              <div class="parent rounded">
                <div class="overlay"></div>
                <img class="rounded aos aos-init aos-animate" data-aos="fade-left" data-aos-delay="300"
                  data-aos-duration="1500" src="../../assets/imgwebp/apaza2.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLangForPage, getConfig } from '@/config/BasicConfig';
const PAGE = 'dashboard';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const lang = ref({});
const router = useRouter();


onMounted(async () => {
  await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
    lang.value = data;
  }).catch(() => {
    router.go(0);
  });
});
</script>


<style scoped>
/* Variables CSS heredadas */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --accent-color: #3498db;
  --decorative-color: #2a5d7f;
  --black-color: #000000;
  --white-color: #ffffff;
  --background-color: #002161;
  --background-color-2: #fc7b0b;
  --background-color-3: #ffffff;
  --background-color-4: #b9d5f1;
  --background-color-5: #1546a7;
  --background-color-6: #2557ba;
  --background-color-7: #0338a3;
  --text-color-1: #ecf1ec;
  --text-color-2: #1044ad;
  --text-color-3: #000000;
  --text-hover-1: #fc7b0b;
  --text-hover-2: #3498db;
  --text-font-1: 'Prompt', sans-serif;
  --divider-color: #a2ada2;
  --border-color: #75767a;
}

/* Fondo principal del dashboard */
.custom-bg {
  background: linear-gradient(135deg, var(--background-color) 0%, var(--background-color-5) 50%, var(--background-color-7) 100%);
  position: relative;
  overflow: hidden;
}

.custom-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(252, 123, 11, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(46, 204, 113, 0.05) 0%, transparent 50%);
  animation: backgroundPulse 10s ease-in-out infinite;
  z-index: -1;
}

@keyframes backgroundPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

/* Título principal */
h2 {
  color: var(--text-color-1);
  font-family: var(--text-font-1);
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  text-shadow: 0 0 20px rgba(252, 123, 11, 0.5);
  animation: titleGlow 3s ease-in-out infinite alternate;
  position: relative;
  margin-bottom: 2rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--background-color-2), var(--accent-color));
  border-radius: 2px;
  animation: underlineExpand 2s ease-in-out infinite;
}

@keyframes titleGlow {
  0% { text-shadow: 0 0 20px rgba(252, 123, 11, 0.3); }
  100% { text-shadow: 0 0 30px rgba(252, 123, 11, 0.8), 0 0 40px rgba(52, 152, 219, 0.4); }
}

@keyframes underlineExpand {
  0%, 100% { width: 100px; }
  50% { width: 150px; }
}

/* Contenedor principal */
.container {
  position: relative;
  z-index: 2;
}

/* Contenedor de imágenes */
.parent {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(135deg, var(--background-color-4) 0%, var(--background-color-6) 100%);
}

.parent:hover {
  transform: translateY(-15px) scale(1.05);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 0 2px var(--background-color-2),
    0 0 50px rgba(252, 123, 11, 0.3);
}

/* Overlay con efectos */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(2, 33, 97, 0.8) 0%,
    rgba(21, 70, 167, 0.6) 30%,
    rgba(252, 123, 11, 0.4) 70%,
    rgba(52, 152, 219, 0.8) 100%
  );
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 2;
}

.parent:hover .overlay {
  opacity: 1;
  background: linear-gradient(
    135deg,
    rgba(2, 33, 97, 0.3) 0%,
    rgba(21, 70, 167, 0.2) 30%,
    rgba(252, 123, 11, 0.6) 70%,
    rgba(52, 152, 219, 0.4) 100%
  );
}

/* Efecto de brillo en el overlay */
.overlay::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.parent:hover .overlay::before {
  opacity: 1;
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

/* Imágenes */
.parent img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.4s ease;
  filter: contrast(1.1) saturate(1.2);
}

.parent:hover img {
  transform: scale(1.1);
  filter: contrast(1.3) saturate(1.4) brightness(1.1);
}

/* Efectos específicos por posición */
.col-7 .parent {
  animation: float 6s ease-in-out infinite;
}

.col-5:nth-child(2) .parent {
  animation: float 6s ease-in-out infinite 1s;
}

.col-5:nth-child(3) .parent {
  animation: float 6s ease-in-out infinite 2s;
}

.col-5:nth-child(4) .parent {
  animation: float 6s ease-in-out infinite 3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Efectos de entrada mejorados */
.aos-init.aos-animate {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  h2 {
    font-size: 2.5rem;
  }
  
  .parent {
    margin-bottom: 1rem;
  }
  
  .parent:hover {
    transform: translateY(-10px) scale(1.02);
  }
}

@media (max-width: 576px) {
  h2 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}

/* Efecto de partículas flotantes */
.custom-bg::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(252, 123, 11, 0.4), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(52, 152, 219, 0.5), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(252, 123, 11, 0.4), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: sparkle 8s linear infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes sparkle {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-100px); }
}

/* Mejoras adicionales para interactividad */
.parent {
  cursor: pointer;
  position: relative;
}

.parent::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(252, 123, 11, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  z-index: 3;
  pointer-events: none;
}

.parent:hover::before {
  width: 100px;
  height: 100px;
}

/* Efecto de ondas al hacer hover */
.parent:active {
  transform: scale(0.95);
}

/* Gradiente animado en los bordes */
.parent::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--background-color-2), var(--accent-color), var(--secondary-color), var(--background-color-2));
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
  transition: opacity 0.3s ease;
}

.parent:hover::after {
  opacity: 1;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
