import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/General.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'

import 'aos/dist/aos.css'
import AOS from "aos"

const app = createApp(App)

app.use(router)
app.use(AOS.init({ duration: 1000, once: true}))
app.mount('#app')
