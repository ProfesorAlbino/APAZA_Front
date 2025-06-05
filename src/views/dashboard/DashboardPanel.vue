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
    <!--     <div class="row mx-3 mx-md-5 mt-auto row-gap-2">
      <div class="col-12 col-md-6">
        <div class="card text-center">
          <div class="card-body" @click="router.push('/admin/add-gallery')">
            <img style="padding: 12px; border-radius: 10px; background-color: rgba(255, 255, 255, 0.6); width: 150px; height: 150px;" src="/gallery.png" alt="">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="card text-center">
          <div class="card-body" @click="router.push('/admin/event-list')">
            <img style="padding: 12px; border-radius: 10px; background-color: rgba(255, 255, 255, 0.6); width: 150px; height: 150px;" src="/events.png" alt="">
          </div>
        </div>
      </div>
    </div> -->
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
.parent {
  position: relative;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: block;
  position: relative;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
}

.parent:hover .overlay {
  background-color: rgba(0, 0, 0, 0);
}


.apaza {
  text-wrap: wrap;
}

.custom-bg {
  background-color: var(--background-color);
}

h2 {
  width: 32ch;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 1s steps(32) normal;
  color: var(--white-color);
}

@keyframes typing {
  from {
    width: 0ch;
  }
}

/* .row {
  margin: auto 5px 0 5px;
  padding-top: 3rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.600);
  background: rgb(132, 130, 163);
  background: linear-gradient(0deg, rgba(132, 130, 163, 0.9416141456582633) 0%, rgba(21, 17, 93, 0.9416141456582633) 50%, rgba(24, 55, 186, 0.958420868347339) 100%);
} */

.card {
  width: 100%;
  height: 14rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: transparent;
}
</style>
