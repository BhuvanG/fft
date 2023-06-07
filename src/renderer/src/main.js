import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'    //theme
import router from './components/router.js'
import { createPinia } from 'pinia'


createApp(App).use(router).use(createPinia()).mount('#app')
