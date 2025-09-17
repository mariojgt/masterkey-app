
import { createRouter, createWebHistory } from '@ionic/vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Scan from '../pages/Scan.vue'
import Branding from '../pages/Branding.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/scan', component: Scan },
  { path: '/branding', component: Branding },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router
