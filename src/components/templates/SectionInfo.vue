<script setup>

defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    count1: {
        type: Number,
        required: true,
    },
    count2: {
        type: Number,
        required: true,
    },
    count3: {
        type: Number,
        required: true,
    },
    countTitle1: {
        type: String,
        required: true,
    },
    countTitle2: {
        type: String,
        required: true,
    },
    countTitle3: {
        type: String,
        required: true,
    },
    countDescription1: {
        type: String,
        required: true,
    },
    countDescription2: {
        type: String,
        required: true,
    },
    countDescription3: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

import { useRouter } from 'vue-router';
const router = useRouter();

function goToEventPage(link) {
    router.push(link);
}
</script>

<template>
    <div id="about" class="about-us section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 align-self-center">
          <div class="left-image">
            <img :src="url" alt="APAZA">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="section-heading">
            <h2>{{title}}</h2>
            <p>{{subtitle}}</p>
            <div class="row">
              <div class="col-lg-4">
                <div class="fact-item">
                  <div class="count-area-content">
                    <div class="icon">
                      <img src="/Test/service-icon-01.png" alt="">
                    </div>
                    <div class="count-digit">{{ count1 }}</div>
                    <div class="count-title">{{ countTitle1 }}</div>
                    <p>{{countDescription1}}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="fact-item">
                  <div class="count-area-content">
                    <div class="icon">
                      <img src="/Test/service-icon-02.png" alt="">
                    </div>
                    <div class="count-digit">{{count2}}</div>
                    <div class="count-title">{{ countTitle2 }}</div>
                    <p>{{countDescription2}}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="fact-item">
                  <div class="count-area-content">
                    <div class="icon">
                      <img src="/Test/service-icon-03.png" alt="">
                    </div>
                    <div class="count-digit">{{ count3 }}</div>
                    <div class="count-title">{{countTitle3}}</div>
                    <p>{{countDescription3}}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 text-center">
                <div>
                  <input type="button" class="btn btn-primary" value="Conócenos" @click="goToEventPage(link)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-us {
  margin-top: 0px;
  padding-top: 120px;
}

.about-us .left-image {
  margin-right: 30px;
}

.about-us .section-heading h2 {
  margin-right: 60px;
}

.about-us .section-heading p {
  margin-top: 50px;
}

.about-us .fact-item .icon {
  width: 45px;
  height: 45px;
}

.about-us .fact-item {
  margin-top: 45px;
}

.about-us .fact-item .count-digit {
  font-size: 48px;
  font-weight: 700;
  color: var(--background-color);
  margin-top: 5px;
}

.about-us .fact-item .count-title {
  font-size: 15px;
  color: var(--background-color-2);
}

.about-us .fact-item p {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--background-color-3);
}

input{
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--background-color-2);
  color: var(--white-color);
  border: none;
  cursor: pointer;
}

input:hover{
  background-color: var(--tex-hover-2);
}

</style>