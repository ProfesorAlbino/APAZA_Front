import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/General.css'
import 'bootstrap/dist/css/bootstrap.css'

import 'aos/dist/aos.css'
import AOS from "aos"

const app = createApp(App)

// Inicializa AOS con un offset alto
AOS.init({ 
  duration: 1000, // Duración de la animación
  once: true,     // Si la animación debe ejecutarse solo una vez
  offset: 400     // Píxeles desde el borde del viewport para activar la animación
})

app.use(router)
app.mount('#app')
