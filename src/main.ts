
import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
const app = createApp(App).use(IonicVue).use(router)
router.isReady().then(() => app.mount('#app'))
