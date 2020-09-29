import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/panel',
    name: 'Panel',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPanel.vue'),
  },
  {
    path:'/',
    name:"login",
    component: () => import('../views/LoginPanel.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router