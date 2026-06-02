import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// Apply theme on startup
const savedTheme = localStorage.getItem('theme') || 'light'
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
localStorage.setItem('theme', savedTheme) // Ensure initial state is set

const app = createApp(App)
app.use(router)
app.mount('#app')
