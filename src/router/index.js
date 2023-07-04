import { createRouter, createWebHistory } from 'vue-router'
import demo from '../views/demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: demo
    }
  ]
})

export default router
