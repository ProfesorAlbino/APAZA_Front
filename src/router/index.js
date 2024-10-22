import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginUser from '@/views/user/LoginUser.vue'
import EventHomePage from '@/views/event/EventHomePage.vue'
import EventPage from '@/views/event/EventPage.vue'
import AddEventPage from '@/views/event/AddEventPage.vue'
import AboutUs from '@/views/aboutUs/AboutUs.vue'
import HomeViewAdmin from '@/views/HomeViewAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },

  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const userRole = getUserRole(); // función que retorna 'admin' o 'user'
        if (userRole === 'admin') {
          next({ name: 'admin-home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/admin-home',
      name: 'admin-home',
      component: HomeViewAdmin,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    },
    {
      path: '/events',
      name: 'events',
      component: EventHomePage
    },
    {
      path: '/event',
      name: 'event',
      component: EventPage
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs
    }
  ]
})

function getUserRole() {
  //return localStorage.getItem('userRole') || 'user';
  return 'admin';
}

export default router
