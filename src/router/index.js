import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginUser from '@/views/user/LoginUser.vue'
import EventHomePage from '@/views/event/EventHomePage.vue'
import EventPage from '@/views/event/EventPage.vue'
import AboutUs from '@/views/aboutUs/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/about',
      name: 'about',
      component: AboutUs
    }
  ]
})

export default router
