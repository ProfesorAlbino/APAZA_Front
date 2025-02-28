<script setup>
import ButtonDarkMode from '../ButtonDarkMode.vue'
import LightMenuIcon from '../icons/LightMenuIcon.vue'
import IconHome from '../icons/MenuIcons/IconHome.vue'
import ManagementBoard from '../icons/MenuIcons/ManagementBoard.vue'
import PartnerIcon from '../icons/MenuIcons/PartnerIcon.vue'
import EventsIcon from '../icons/MenuIcons/EventsIcon.vue'
import AdminIcon from '../icons/MenuIcons/AdminIcon.vue'
</script>

<template>
  <nav ref="navbar" class="navbar navbar-solid navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" @click="gotoHome">
        <img src="/Apaza/.webp/apaza_logo.webp" alt="APAZA Logo" class="me-2 navbar-logo" />
        <span id="title" class="fs-2 fw-semibold">{{ lang.value?.title || '' }}</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <LightMenuIcon></LightMenuIcon>
      </button>
      <div
        :class="[
          'offcanvas offcanvas-end fs-5',
          { 'text-bg-dark': darkTheme, 'offcanvas-light': !darkTheme }
        ]"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        ref="navbarCollapse"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li
              :class="[{ active: $route.path === '/' }, 'nav-item']"
              aria-current="page"
              @click="gotoHome"
              data-bs-dismiss="offcanvas"
            >
              <IconHome class="menu-icon"></IconHome>
              <label>{{ lang.value?.navbar?.titles?.start || '' }}</label>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <ManagementBoard class="menu-icon"></ManagementBoard>
              <label>{{ lang.value?.navbar?.titles?.team || '' }}</label>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <PartnerIcon class="menu-icon"></PartnerIcon>
              <label>{{ lang.value?.navbar?.titles?.sponsors || '' }}</label>
            </li>

            <li
              :class="[
                { 'active': $route.path === '/events' || $route.path === '/event' },
                'nav-item'
              ]"
              @click="goToPage('/events')"
              data-bs-dismiss="offcanvas"
            >
              <EventsIcon class="menu-icon"></EventsIcon>
              <label>{{ lang.value?.navbar?.titles?.events || '' }}</label>
            </li>
            <li class="nav-item" v-if="isUserLoggedAdmin()" @click="goToPage('/admin/')">
              <AdminIcon class="menu-icon"/>
              <label>{{ lang.value?.navbar?.titles?.admin || '' }}</label>
            </li>
          </ul>
          <div class="divider-div"></div>
          <ButtonDarkMode
            class="bs-padding"
            :themeLabel="lang"
            @theme-change="handleThemeChange"
            data-bs-dismiss="offcanvas"
          />
          <div class="divider"></div>
          <div class="dropdown">
            <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {{ lang.value?.navbar?.languages?.language || '' }}
            </button>
            <ul
              :class="[
                'dropdown-menu',
                { 'dropdown-menu-dark': darkTheme },
                { 'dropdown-bg': !darkTheme }
              ]"
            >
              <li>
                <a id="es" class="dropdown-item" @click="changeLanguage(LANGS.ES)">{{
                  lang.value?.navbar?.languages?.spanish || ''
                }}</a>
              </li>
              <li>
                <a id="en" class="dropdown-item" @click="changeLanguage(LANGS.EN)">{{
                  lang.value?.navbar?.languages?.english || ''
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { getLangForPage, getConfig, setLang, LANGS } from '@/config/BasicConfig'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { ref } from 'vue'

const PAGE = 'navbar'

export default {
  data() {
    return {
      router: useRouter(),
      lang: ref({}),
      LANGS,
      isUserLoggedAdmin,
      navbarCollapse: null,
      darkTheme: false
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    await getLangForPage(getConfig().CURRENT_LANG, PAGE)
      .then((data) => {
        this.lang.value = data
      })
      .catch(() => {
        this.router.go(0)
      })
    this.toggleClass()
    rippleEffect()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleThemeChange(isDarkTheme) {
      this.darkTheme = isDarkTheme
    },
    navigateLoginOrLogout() {
      //window.location.href = '/login';
      this.router.push('/login')
      this.navbarClass = 'navbar-solid' // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****
    },
    goToEvents() {
      this.router.push('/events')
      this.navbarClass = 'navbar-solid' // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****
    },
    gotoHome() {
      this.router.push('/')
    },
    goToPage(url) {
      this.router.push(url)
    },
    changeLanguage(lang) {
      setLang(lang)
      this.router.go(0)
    },
    toggleClass() {
      if (getConfig().CURRENT_LANG === 'es') {
        document.getElementById('es').classList.add('active')
        document.getElementById('en').classList.remove('active')
      } else {
        document.getElementById('en').classList.add('active')
        document.getElementById('es').classList.remove('active')
      }
    }
  }
}

/* ripple animation on click menu link */
const rippleEffect = () => {
  const buttons = document.querySelectorAll('li')
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect()
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top

      let ripple = document.createElement('span')
      ripple.classList.add('ripple-effect')
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      this.appendChild(ripple)

      setTimeout(() => ripple.remove(), 400)
    })
  })
}
</script>

<style scoped lang="scss">
:deep(.ripple-effect) {
  position: absolute;
  background: var(--accent-color);
  transform: translate(-50%, -50%);
  pointer-events: none;
  width: 0;
  height: 0;
  border-radius: 50%;
  animation: wave 0.3s linear;
}
@keyframes wave {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.2;
  }
  100% {
    height: 300px;
    width: 300px;
    opacity: 0;
  }
}
.navbar {
  transition: background-color 0.8s ease;
}

.offcanvas-light {
  color: #fff;
  background-color: var(--background-color);
}
.offcanvas.offcanvas-end {
  border-radius: 8px 0 0 8px;
  @media (max-width: 768px) {
    width: 280px;
  }
}
.btn-close {
  --bs-btn-close-focus-shadow: none;
}

.navbar-solid {
  background-color: var(--background-color);
}
img {
  height: auto;
  width: 50px;
  padding: 2px;
  background: linear-gradient(to right, white, #1b91e0);
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 3px solid #fff;

  &.navbar-logo {
    transition: transform 0.3s ease;
  }

  &.navbar-logo:hover {
    opacity: 1;
    cursor: pointer;
    transform: scale(1.2);
  }
}

.nav-item {
  position: relative;
  overflow: hidden;
}

li label {
  cursor: pointer !important;
}
#title {
  color: var(--text-color-1);
  position: relative;
  width: max-content;
  animation: text-shadow-pop-top 0.8s both;
}

@keyframes text-shadow-pop-top {
  0% {
    text-shadow:
      0 0 #555555,
      0 0 #555555,
      0 0 #555555,
      0 0 #555555,
      0 0 #555555,
      0 0 #555555,
      0 0 #555555,
      0 0 #555555;
    transform: translateY(0);
  }
  100% {
    text-shadow:
      0 -1px #1b91e0,
      0 -2px #1b91e0,
      0 -3px #1b91e0,
      0 -4px #1b91e0;
    transform: translateY(8px);
  }
}

.navbar-toggler:focus {
  box-shadow: none;
}

li.active {
  color: var(--accent-color) !important;
}

li:not(.active) {
  color: var(--text-color-1-dark, #fff);
}
/* Estilos para modo oscuro (basado en el modo del SO) */
@media (prefers-color-scheme: dark) {
  .navbar-solid {
    background-color: var(--background-color);
  }
}

@media (min-width: 990px) {
  .menu-icon {
    display: none;
  }
  .navbar .nav-item {
    position: relative;
    padding: 15px 15px;
    transition: background-color 0.3s ease;
  }

  .navbar .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.102);
  }
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 3px;
    width: 0;
    background-color: var(--accent-color);
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }


  .navbar li:hover::after {
    width: 100%;
    left: 0;
  }

  button:not(.btn-close, .btn-close-white) {
    border: none;
    color: #fff;
    background-color: var(--background-color);
  }
  button:not(.btn-close, .btn-close-white):focus {
    border: none;
  }
  button:not(.btn-close, .btn-close-white):active {
    border: none;
  }

  .divider{
    margin: 6px 0;
    margin-left: 2.5rem;
    border-right: 1px solid var(--divider-color);
  }
  .dropdown {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;

    li {
      padding: 3px;
    }
  }
}

@media (max-width: 990px) {
  .navbar .nav-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
  .menu-icon {
    display: block;
    margin-right: 10px;
  }

  .divider-div {
    border-bottom: 1px solid rgba(105, 95, 95, 0.521);
    margin: 10px;
  }
  button:not(.btn-close, .btn-close-white) {
    color: #fff;
    background-color: var(--background-color);
  }

  .btn:focus {
    border: none;
  }

  .dropdown-menu {
    border: 1px solid var(--background-color);
  }
}

.dropdown-menu {
  padding: 5px;
  box-shadow: 0 2px 4px rgba(180, 171, 177, 0.486);
  .dropdown-item {
    border-radius: 5px;
  }
  .dropdown-item.active {
    background-color: var(--background-color);
  }
  .dropdown-item:active {
    background-color: var(--background-color-4);
  }
  .dropdown-item:not(.active):hover {
    background-color: #4ea4d6;
  }
}
.dropdown-bg {
  background: #2f73b7a1 !important;
}
</style>
