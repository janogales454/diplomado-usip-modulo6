import { createRouter, createWebHistory } from 'vue-router'
import TiposView from '../views/TiposView.vue'
import VentasView from '../views/VentasView.vue'
import HeladosView from '../views/HeladosView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/tipos',
    name: 'tipos',
    component: TiposView
  },
  {
    path: '/helados',
    name: 'helados',
    component: HeladosView
  },
  {
    path: '/ventas',
    name: 'ventas',
    component: VentasView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
