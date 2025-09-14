
import { createRouter, createWebHistory } from '@ionic/vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Scan from '../pages/Scan.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/scan', component: Scan },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router
