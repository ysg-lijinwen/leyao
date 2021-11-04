import MockAdapter from 'axios-mock-adapter'
import { $fetch } from '../api/apiFetch'
// 引入模拟后端返回数据模块
import { success, serverError } from './dataDefine/response'

export default {
  init () {
    const mock = new MockAdapter($fetch)
    // post
    mock.onPost('/leyao/bis/reptile').reply(request => {
      console.log(request)
      const page = require('webpage')
      console.log(page)
      page.create()
      page.open('https://www.jianshu.com/', function (status) {
        console.log(status) // 若打开成功则打印出success，否则输出fail
        // phantom.exit()
        if (status === 'success') {
          return new Promise(resolve => {
            resolve([200, {
              ...success
            }])
          })
        } else {
          return new Promise(resolve => {
            resolve([200, serverError])
          })
        }
      });
    })
    // // get
    // mock.onGet('/adu/userType/update ').reply(request => {
    //   const {
    //     id,
    //     userTypeName,
    //     userTypeCode,
    //     remark
    //   } = request
    //   Users.some(u => {
    //     if (u.id === id) {
    //       u.userTypeName = userTypeName
    //       u.userTypeCode = userTypeCode
    //       u.remark = remark
    //       return true
    //     }
    //   })
    //   return new Promise(resolve => {
    //     resolve([200, success])
    //   })
    // })
  }
}
