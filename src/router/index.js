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
  const userRole = isUserLoggedAdmin();
  console.log("Usuario Rol: " + userRole);
  
  if (to.meta.requiresAdmin) {
    if (userRole) {
      console.log('Acceso concedido a la ruta de administrador');
      next();
    } else {
      console.log('Acceso denegado. Redirigiendo a la página de inicio');
      next({ name: 'home' });
    }
  } else {
    console.log('Acceso concedido a la ruta normal');
    next();
  }
});

export default router