import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/views/layouts/AdminLayout.vue'
import UserLayout from '@/views/layouts/UserLayout.vue'
import HomeView from '../views/HomeView.vue' 
import LoginUser from '@/views/user/LoginUser.vue'
import EventHomePage from '@/views/event/EventHomePage.vue'
import EventPage from '@/views/event/EventPage.vue'
import AddEventPage from '@/views/event/AddEventPage.vue'
import AboutUs from '@/views/aboutUs/AboutUs.vue'
import HomeViewAdmin from '@/views/HomeViewAdmin.vue'
import GalleryAdmin from '@/views/gallery/GalleryAdmin.vue'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { setProductionMode, getConfig } from '@/config/BasicConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  
  //Rutas del administrador
  routes: [
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-home',
          component: HomeViewAdmin
        },
        {
          path: 'add-event',
          name: 'add-event',
          component: AddEventPage
        },
        {
          path: 'add-gallery',
          name: 'add-gallery',
          component: GalleryAdmin
        },
        {
          path: 'event-list',
          name: 'event-list',
          component: EventHomePage
        }
      ]
    },
    
    //Rutas del usuario
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'login',
          name: 'login',
          component: LoginUser
        },
        {
          path: 'events',
          name: 'events',
          component: EventHomePage
        },
        {
          path: 'event',
          name: 'event',
          component: EventPage
        },
        {
          path: 'about',
          name: 'about',
          component: AboutUs
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (window.location.hostname !== 'localhost' && getConfig().IS_DEVELOPMENT) {
    setProductionMode();
  }
  const userAdmin = isUserLoggedAdmin();
  
  if (to.meta.requiresAdmin) {
    if (userAdmin) {
      next();
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});

export default router