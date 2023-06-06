import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'    //theme
import router from './components/router.js'


createApp(App).use(router).mount('#app')
