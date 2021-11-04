/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2021-07-03 09:13:06
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-09-06 11:55:07
 * @FilePath: /operation-management/src/api/apiFetch.js
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
 */
import axios from 'axios'
import { Loading } from 'element-ui'

// 请求数量
let requestCount = 0
// Loading对象
let loadingInstance

// 请求超时时间
axios.defaults.timeout = 1200000 // 20分钟
// post默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const showLoading = () => {
  if (requestCount < 0) requestCount = 0
  requestCount++
  if (requestCount === 1) {
    loadingInstance = Loading.service({
      lock: true,
      text: '努力爬取中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
}

const closeLoading = () => {
  requestCount--
  if (loadingInstance && requestCount === 0) {
    loadingInstance.close()
  }
}

// 请求拦截器
axios.interceptors.request.use(request => {
  if (!request.notShowLoading) {
    showLoading()
  }
  return request
})

// 响应拦截器
axios.interceptors.response.use(async response => {
  closeLoading()
  if (response?.status === 200) {
    return Promise.resolve(response.data)
  } else {
    console.log(response.message)
    return false
  }
}, error => {
  console.log(error)
  closeLoading()
  // 服务器状态码不是200的情况
  // switch (error?.response?.status) {
  //   // 500 服务器异常
  //   case 500:
  //     MessageBox({
  //       title: '提示',
  //       message: '服务器异常',
  //       type: 'error'
  //     })
  //     break
  //   // 403 token过期
  //   // 登录过期对用户进行提示
  //   // 清除本地token和清空vuex中token对象
  //   // 跳转登录页面
  //   case 403:
  //     MessageBox({
  //       title: '提示',
  //       message: '无访问权限',
  //       type: 'error'
  //     })
  //     break
  //   // 请求的内容不存在
  //   case 404:
  //     MessageBox({
  //       title: '提示',
  //       message: '请求的资源不存在',
  //       type: 'error'
  //     })
  //     break
  //   // 401: 未登录
  //   // 未登录则跳转登录页面，并携带当前页面的路径
  //   // 在登录成功后返回当前页面，这一步需要在登录页操作。
  //   case 401:
  //     MessageBox({
  //       title: '提示',
  //       message: '未登录',
  //       type: 'error'
  //     })
  //     break
  //   // return Promise.reject(new Error('网络请求不存在'))
  //   // 其他错误，直接抛出错误提示
  //   default:
  //     // 其他错误，直接抛出错误提示
  //     MessageBox({
  //       title: '提示',
  //       message: error?.response?.data?.message || '未知错误，请联系管理员',
  //       type: 'error'
  //     })
  //     break
  // }
  return false
})

export {
  axios as $fetch
}
