<script setup>
import ButtonDarkMode from '../ButtonDarkMode.vue'
import LightMenuIcon from '../icons/LightMenuIcon.vue'
import IconHome from '../icons/MenuIcons/IconHome.vue'
import ManagementBoard from '../icons/MenuIcons/ManagementBoard.vue'
import PartnerIcon from '../icons/MenuIcons/PartnerIcon.vue'
import EventsIcon from '../icons/MenuIcons/EventsIcon.vue'
</script>

<template>
  <nav
    ref="navbar"
    :class="['navbar', 'navbar-solid', 'navbar-expand-lg', 'fixed-top', navbarClass]"
  >
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" @click="gotoHome">
        <img
          src="/Apaza/.webp/apaza_logo.webp"
          alt="APAZA Logo"
          width="60"
          height="60"
          class="me-2 navbar-logo"
        />
        <span id="title" class="fs-2 fw-semibold">{{ lang.value?.title || '' }}</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <LightMenuIcon></LightMenuIcon>
      </button>
      <div class="collapse navbar-collapse fs-5" id="navbarNav" ref="navbarCollapse">
        <ul class="navbar-nav ms-auto">
          <li
            :class="[{ active: $route.path === '/' }, 'nav-item']"
            aria-current="page"
            @click="gotoHome"
          >
            <IconHome class="menu-icon"></IconHome>
            <label>{{ lang.value?.navbar?.titles?.start || '' }}</label>
          </li>
          <li class="nav-item">
            <ManagementBoard class="menu-icon"></ManagementBoard>
            <label>{{ lang.value?.navbar?.titles?.team || '' }}</label>
          </li>
          <li class="nav-item">
            <PartnerIcon class="menu-icon"></PartnerIcon>
            <label>{{ lang.value?.navbar?.titles?.sponsors || '' }}</label>
          </li>

          <li
            :class="[{ active: $route.path === '/events' || $route.path === '/event' }, 'nav-item']"
            @click="goToPage('/events')"
          >
            <EventsIcon class="menu-icon"></EventsIcon>
            <label>{{ lang.value?.navbar?.titles?.events || '' }}</label>
          </li>
          <li class="nav-item" v-if="isUserLoggedAdmin()" @click="goToPage('/admin/')">
            <label>{{ lang.value?.navbar?.titles?.admin || '' }}</label>
          </li>
        </ul>

        <ButtonDarkMode class="bs-padding" :themeLabel="lang" />
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ lang.value?.navbar?.languages?.language || '' }}
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
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
  </nav>
</template>

<script>
import { Collapse } from 'bootstrap'
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
    rippleEffect();

    const CollapseElement = this.$refs.navbarCollapse;
    this.navbarCollapse = new Collapse(CollapseElement,{ toggle: false });

  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    navigateLoginOrLogout() {
      //window.location.href = '/login';
      this.router.push('/login')
      this.navbarClass = 'navbar-solid' // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****
    },
    goToEvents() {
      this.router.push('/events');
      this.closeNavbar();
      this.navbarClass = 'navbar-solid' // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****
    },
    gotoHome() {
      this.router.push('/');
      this.closeNavbar();
    },
    goToPage(url) {
      this.router.push(url);
      this.closeNavbar();
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
    },

    closeNavbar(){
      if(window.innerWidth < 992 && this.navbarCollapse) this.navbarCollapse.hide();
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

img {
  height: auto;
  width: 50px;
  padding: 2px;
  background: linear-gradient(to right, white, #1b91e0);
  box-shadow: 0 4px 8px rgba(247, 24, 161, 0.486) inset, ;
  border-radius: 50%;
  margin-right: 0.5rem;
}
:deep(.ripple-effect) {
  position: absolute;
  background: #fff;
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

.navbar-solid {
  background-color: var(--background-color);
}

.navbar-logo {
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  opacity: 1;
  cursor: pointer;
  transform: scale(1.2);
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
}

/* #title::after {
  content: ' ';
  background: linear-gradient(to right, white, #1b91e0);
  height: 3px;
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  border-radius: 2px;
} */

.navbar-toggler:focus {
  box-shadow: none;
}

li.active {
  color: var(--color-active-light) !important;
}
.dark-mode li.active {
  color: var(--color-active-dark) !important;
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
  .navbar li {
    position: relative;
    padding: 15px 15px;
    transition: background-color 0.3s ease;
  }

  .navbar li:hover {
    background-color: rgba(255, 255, 255, 0.102);
  }
  li::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 3px;
    width: 0;
    background-color: #1b91e0;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }

  .navbar li:hover::after {
    width: 100%;
    left: 0;
  }

  .dropdown {
    margin-left: 3rem;
  }
}

@media (max-width: 990px) {
  .navbar li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
  .custom-dropdown {
    padding-left: 0;
  }
  .menu-icon {
    display: block;
    margin-right: 10px;
  }
  ul li {
    border-bottom: 1px solid #ffffff1a;
  }
}
</style>
