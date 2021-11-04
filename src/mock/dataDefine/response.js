// 系统级别错误码
// 正常
const success = {
  code: '000000',
  message: 'success'
}
// 服务器异常
const serverError = {
  code: '000001',
  message: '系统异常'
}
// 请求非法
const fetchReject = {
  code: '000002',
  message: '非法请求'
}
// token失效
const tokenFailure = {
  code: '000003',
  message: 'token失效'
}

// 业务层面错误码
// 用户名密码错误
const loginError = {
  code: '66030001',
  message: '用户密码错误，请重新输入'
}
// 用户名密码错误
const recordError = {
  code: '66030014',
  message: '记录不存在'
}

// 文件服务错误
const fileError = {
  code: '66040001',
  message: '不存在的文件'
}

export { success, serverError, fetchReject, tokenFailure, loginError, recordError, fileError }
