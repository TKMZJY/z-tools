import { createRouter, createWebHashHistory } from 'vue-router'
// 1231
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return {top: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue')
        },
        {
            path: '/time',
            name: 'time',
            component: () => import('../views/time.vue')
        }
    ]
}) 

export default router
