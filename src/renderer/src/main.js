import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'    //theme
import router from './components/router.js'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import '@sweetalert2/theme-dark/dark.css';


createApp(App).use(VueSweetalert2).use(router).use(createPinia()).mount('#app')
