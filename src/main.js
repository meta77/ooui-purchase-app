import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// Apply theme on startup
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
