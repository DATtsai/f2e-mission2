import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/pocDemo',
      name: 'demo',
      component: () => import('../views/pocDemo.vue')
    }
  ]
})

export default router
