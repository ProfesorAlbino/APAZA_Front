<template>
  <div class="wrapper d-flex">
    <button class="toggle-btn btn btn-primary d-md-none" @click="toggleSidebar">☰</button>

    <aside id="sidebar" :class="{ active: !isSidebarVisible }">
      <div class="sidebar-header d-flex mh-25">
        <button class="toggle-btn btn btn-primary d-md-none me-2" @click="toggleSidebar">☰</button>
        <a @click="goToPage('/')">
          <h3 class="text-white">{{ lang?.sidebar?.titles?.main }}</h3>
        </a>
      </div>

      <ul class="list-unstyled components">
        <li class="d-flex flex-row aside-item" @click="goToPage('/')">
          <ToHomeIcon class="menu-icon"></ToHomeIcon>
          <label>{{ lang?.sidebar?.menu?.home ?? '' }}</label>
        </li>
        <li
          class="d-flex flex-row aside-item"
          @click="goToPage('/admin/dashboard')"
          :class="{ active: activeRoute === '/admin/dashboard' }"
        >
          <DashboardIcon class="menu-icon" />
          <label>{{ lang?.sidebar?.menu?.dashboard ?? '' }}</label>
        </li>
        <li
          class="d-flex flex-row aside-item"
          @click="goToPage('/admin/add-gallery')"
          :class="{ active: activeRoute === '/admin/add-gallery' }"
        >
          <GalleryIcon class="menu-icon"></GalleryIcon>
          <label>{{ lang?.sidebar?.menu?.gallery ?? '' }}</label>
        </li>
        <li
          class="d-flex flex-row aside-item"
          :class="{ active: activeRoute === '/admin/event-list' }"
          @click="goToPage('/admin/event-list')"
        >
          <EventsIcon class="menu-icon"></EventsIcon>
          <label>{{ lang?.sidebar?.menu?.events ?? '' }}</label>
        </li>
        <li
          class="d-flex flex-row aside-item"
          :class="{ active: activeRoute === '/admin/board-list' }"
          @click="goToPage( '/admin/board-list')"
        >
        <BoardIcon class="menu-icon"></BoardIcon>
        <label>{{ lang?.navbar?.titles?.team || '' }}</label>
        </li>
      </ul>
      <div class="dropdown ms-3">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ lang?.sidebar?.titles?.language ?? '' }}
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <a id="es" class="dropdown-item" @click="changeLanguage(LANGS.ES)">{{
              lang?.sidebar?.languages?.spanish ?? ''
            }}</a>
          </li>
          <li>
            <a id="en" class="dropdown-item" @click="changeLanguage(LANGS.EN)">{{
              lang?.sidebar?.languages?.english ?? ''
            }}</a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
//------------------------------------------------------------------------------------------PARA @ProfesorAlbino POR FAVOR USAR EL SCRIPT SETUP, NO EL OTRO
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { setLang, LANGS, getLangForPage, getConfig } from '@/config/BasicConfig'
import { rippleEffect } from '@/composables/rippleEffect'
import DashboardIcon from '../icons/MenuIcons/DashboardIcon.vue'
import GalleryIcon from '../icons/MenuIcons/GalleryIcon.vue'
import EventsIcon from '../icons/MenuIcons/EventsIcon.vue'
import OtherIcon from '../icons/MenuIcons/OtherIcon.vue'
import ToHomeIcon from '../icons/MenuIcons/ToHomeIcon.vue'
import BoardIcon from '../icons/MenuIcons/BoardIcon.vue'

const router = useRouter();
const activeRoute = ref(router.currentRoute.value.path)
const PAGE = 'sidebar'
/* const sidebarActive = ref(false);
const homeSubmenuExpanded = ref(false);
const pageSubmenuExpanded = ref(false); */

const lang = ref({})

function goToPage(link) {
  router.push(link);
  activeRoute.value = link;
}

function changeLanguage(lang) {
  setLang(lang)
  this.router.go(0)
}

/* const toggleSidebar = () => {
    sidebarActive.value = !sidebarActive.value;
};

const toggleSubmenu = (submenu) => {
    if (submenu === 'home') {
        homeSubmenuExpanded.value = !homeSubmenuExpanded.value;
    } else if (submenu === 'page') {
        pageSubmenuExpanded.value = !pageSubmenuExpanded.value;
    }
}; */

onMounted(async () => {
  await getLangForPage(getConfig().CURRENT_LANG, PAGE)
    .then((data) => {
      lang.value = data
    })
    .catch(() => {
      router.go(0)
    })

  rippleEffect()
})
// Estado para controlar la visibilidad del sidebar
const isSidebarVisible = ref(true)

// Alterna el estado del sidebar
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}
</script>

<style scoped lang="scss">
@include ripple-effect();

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  background-color: rgba(33,37,41, 1);
  transition: all 0.3s;
  position: fixed;
  font-family: var(--text-font-1);
  border-right: 1px solid var(--border-color);
  z-index: 1000;
}

.active {
  color: var(--accent-color) !important;
}

#sidebar .sidebar-header {
  padding: 20px;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid var(--background-color-6);
}

#sidebar .aside-item {
  overflow: hidden;
  position: relative;
  padding: 10px 20px;
  font-size: 1.1em;
  color: var(--text-color-1);
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar ul .aside-item:not(.active):hover {
  background: rgba(var(--white-color-rgb), 0.1)
}
#sidebar ul li label:hover {
  cursor: pointer;
}

#sidebar ul ul label {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background-color: var(--background-color-7);
}
.menu-icon {
  @include menuIcon();
}

#content {
  margin-left: 250px;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  background-color: var(--background-color-3);
}

@include respond-to($breakpoint: 'mobile') {
  #sidebar {
    margin-left: -250px;
  }

  #sidebar.active {
    margin-left: 0;
  }

  #content {
    margin-left: 0;
  }
}

.toggle-btn {
  background-color: var(--background-color-2);
  color: var(--text-color-1);
  border: none;
}

.toggle-btn:hover {
  background-color: var(--background-color-5);
  color: var(--text-hover-1);
}
</style>
