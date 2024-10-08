<template>
    <div id="services" class="our-services section">
    <div class="services-right-dec">
      <img src="/Test/services-right-dec.png" alt="">
    </div>
    <div class="container">
      <div class="services-left-dec">
        <img src="/Test/services-left-dec.png" alt="">
      </div>
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="section-heading">
            <h2>We <em>Provide</em> The Best Service With <span>Our Tools</span></h2>
            <span>Our Services</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="owl-carousel owl-services">
            <div class="item">
              <h4>Learn More about our Guidelines</h4>
              <div class="icon"><img src="/Test/service-icon-01.png" alt=""></div>
              <p>Feel free to use this template for your business</p>
            </div>
            <div class="item">
              <h4>Develop The Best Strategy for Business</h4>
              <div class="icon"><img src="/Test/service-icon-02.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>UI / UX Design and Development</h4>
              <div class="icon"><img src="/Test/service-icon-03.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>Discover &amp; Explore our SEO Tips</h4>
              <div class="icon"><img src="/Test/service-icon-04.png" alt=""></div>
              <p>Feel free to use this template for your business</p>
            </div>
            <div class="item">
              <h4>Optimizing your websites for Speed</h4>
              <div class="icon"><img src="/Test/service-icon-01.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>See The Strategy In The Market</h4>
              <div class="icon"><img src="/Test/service-icon-02.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>Best Content Ideas for your pages</h4>
              <div class="icon"><img src="/Test/service-icon-03.png" alt=""></div>
              <p>Feel free to use this template for your business</p>
            </div>
            <div class="item">
              <h4>Optimizing Speed for your web pages</h4>
              <div class="icon"><img src="/Test/service-icon-04.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>Accessibility for mobile viewing</h4>
              <div class="icon"><img src="/Test/service-icon-01.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>Content Ideas for your next project</h4>
              <div class="icon"><img src="/Test/service-icon-02.png" alt=""></div>
              <p>Feel free to use this template for your business</p>
            </div>
            <div class="item">
              <h4>UI &amp; UX Design &amp; Development</h4>
              <div class="icon"><img src="/Test/service-icon-03.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
            <div class="item">
              <h4>Discover the digital marketing trend</h4>
              <div class="icon"><img src="/Test/service-icon-04.png" alt=""></div>
              <p>Get to know more about the topic in details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

let owlServices = ref(null);
let items = [];
let currentIndex = 0;
let autoplay = true;
let margin = 5;

const settings = {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 },
    1600: { items: 4 }
};

function getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 1600) {
        return settings[1600].items;
    } else if (width >= 1000) {
        return settings[1000].items;
    } else if (width >= 600) {
        return settings[600].items;
    } else {
        return settings[0].items;
    }
}

function showItems() {
    const itemsPerView = getItemsPerView();
    items.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + itemsPerView) {
            item.style.display = 'inline-block';
            item.style.marginRight = margin + 'px';
        } else {
            item.style.display = 'none';
        }
    });
}

function nextItem() {
    const itemsPerView = getItemsPerView();
    currentIndex = (currentIndex + itemsPerView) % items.length;
    showItems();
}

function startAutoplay() {
    if (autoplay) {
        setInterval(nextItem, 3000); // Cambia cada 3 segundos
    }
}

onMounted(() => {
    owlServices.value = document.querySelector('.owl-services');
    if (owlServices.value) {
        items = owlServices.value.querySelectorAll('.item');
        window.addEventListener('resize', showItems);
        showItems();
        startAutoplay();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', showItems);
});
</script>

<style>
.owl-services {
  /* Styles for owl-services */
}

.item {
  /* Styles for individual items */
}
</style>

<style scoped>
.our-services .services-left-dec img {
  width: 387px;
  height: 638px;
  left: -80px;
  top: -140px;
  position: absolute;
  z-index: 1;
}

.our-services .services-right-dec img {
  width: 305px;
  height: 305px;
  right: 25px;
  bottom: -120px;
  position: absolute;
  z-index: 1;
}

.our-services .container {
  position: relative;
}

.our-services {
  position: relative;
  margin-top: 0px;
  padding-top: 120px;
}

.our-services .section-heading {
  text-align: center;
  margin-bottom: 45px;
}

.our-services .section-heading h2 {
  margin: 0px 60px;
  margin-bottom: -10px;
}

.our-services .item {
  text-align: center;
  margin: 15px;
  border-radius: 20px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.05);
}

.our-services .item h4 {
  font-size: 20px;
  font-weight: 700;
  color: #2a2a2a;
  margin-bottom: 30px;
  line-height: 30px;
}

.our-services .item .icon {
  width: 45px;
  height: 45px;
  margin: 0 auto;
}

.our-services .item p {
  margin-top: 35px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.our-services .owl-dots {
  text-align: center;
  margin-top: 40px;
}
.our-services .owl-dots .owl-dot {
  width: 6px;
  height: 6px;
  background-color: #ff695f;
  border-radius: 50%;
  opacity: 0.3;
  margin: 0px 5px;
}

.our-services .owl-dots .active {
  opacity: 1;
  width: 10px;
  height: 10px;
}
</style>