
import { createRouter, createWebHistory } from 'vue-router'
import Preds from './Preds.vue'
import Standing from './Standing.vue'

const routes = [
    {
        path: '/',
        component: Preds
    },
    {
        path: '/preds',
        component: Standing
    }
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router