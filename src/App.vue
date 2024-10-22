<script setup>
import { ref} from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/templates/Navbar.vue';
import Footer from './components/templates/Footer.vue';
import SideBar from './components/templates/SideBar.vue';

// Crear `isUser` como un `ref` para hacerlo reactivo
const isUser = ref(false);

// onMounted(() => {
//   const userRole = localStorage.getItem('userRole'); // Ejemplo para obtener el rol del usuario
//   isUser.value = userRole !== 'admin'; // Si no es admin, se considera usuario regular
// });
</script>

<template>
  <div class="flex flex-col min-h-screen" :id="isUser ? 'container-regular' : 'container-admin'">
    <header>
      <Navbar v-if="isUser" />
      <SideBar v-else />
    </header>

    <main class="container-fluid p-0">
      <nav>
        <RouterLink to="/" />
      </nav>
      <RouterView />
    </main>

    <footer :class="isUser ? 'footer-regular' : 'footer-admin'">
      <Footer />
    </footer>
  </div>
</template>


<style scoped>
/* Estilos para el footer de usuarios regulares */
#container-regular{
  width: 100%;
  margin-left: 0;
}

/* Estilos para el footer cuando el usuario es administrador */

#container-admin {
  width: calc(100% - 250px);
  margin-left: 250px;
}

/* Otros estilos globales */
body {
  @apply bg-[var(--background-color-3)];
}
</style>
