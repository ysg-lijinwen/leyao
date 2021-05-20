/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2020-12-22 20:28:43
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-05-19 22:10:59
 * @FilePath: /cx/Users/lijinwen/study-p/vue-demo/leyao/src/main.js
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import directives from './directives'

Vue.use(ElementUI);
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
