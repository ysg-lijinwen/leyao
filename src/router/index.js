import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 动态路由的起始，只包含最基本的数据
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/customDirect',
    name: 'CustomDirectDemo',
    component: () => import('../views/custom-direct-demo.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

export default router
