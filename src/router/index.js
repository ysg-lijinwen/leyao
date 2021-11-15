/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2020-12-22 21:04:59
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-05-19 22:07:45
 * @FilePath: /cx/Users/lijinwen/study-p/vue-demo/leyao/src/router/index.js
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
 */
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
  },
  {
    path: '/fullScreen',
    name: 'FullScreenDemo',
    component: () => import('../views/full-screen-demo.vue')
  },
  {
    path: '/region',
    name: 'RegionDemo',
    component: () => import('../views/region-demo.vue')
  },
  {
    path: '/reptile',
    name: 'ReptileDemo',
    component: () => import('../views/reptile-demo.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

export default router
