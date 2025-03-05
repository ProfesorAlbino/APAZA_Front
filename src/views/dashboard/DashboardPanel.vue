<template>
  <div class="d-flex flex-column min-vh-100 custom-bg">
    <div class="d-flex justify-content-center mt-5">
      <h2>{{lang?.dashboard?.titles?.welcome}}</h2>
    </div>
    <div class="row mx-3 mx-md-5 mt-auto row-gap-2">
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

.custom-bg {
  background-image: url('/Background/bg-admin.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
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

.row {
  margin: auto 5px 0 5px;
  padding-top: 3rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.600);
  background: rgb(132,130,163);
  background: linear-gradient(0deg, rgba(132,130,163,0.9416141456582633) 0%, rgba(21,17,93,0.9416141456582633) 50%, rgba(24,55,186,0.958420868347339) 100%);}
.card {
  width: 100%;
  height: 14rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: transparent;
}
</style>
