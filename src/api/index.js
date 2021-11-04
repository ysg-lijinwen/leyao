import { $fetch } from './apiFetch'
const baseUrlConfig = {
  ljw: 'http://localhost:3066',
  mock: ''
}
// 环境配置，方便dev开发与build打包
const service = process.env.NODE_ENV === 'production' ? baseUrlConfig.mock : baseUrlConfig.ljw
// 文件API路径
export const fileService = `${service}`
// 文件访问前缀--》》 通过路径访问
export const filePrefixPath = `${fileService}/fs/file/view/byPath/`
// 文件访问前缀--》》 通过ID访问
export const filePrefixId = `${fileService}/fs/file/view/byId/`
// 文件访问前缀--》》 id和相对路径不区别
export const filePrefixIdPath = `${fileService}/fs/file/view/byIdOrPath/`
// 爬
// export const reptile = () => $fetch.get(`${service}/reptile`)
// 云南国防科工局文章
export const reptileYngfkgjContent = data => $fetch.post(`${service}/reptile/yngfkgj/content`, data)
export const reptileYngfkgjContentBatch = data => $fetch.post(`${service}/reptile/yngfkgj/content/batch`, data)
export const reptileYngfkgjList = data => $fetch.post(`${service}/reptile/yngfkgj/list`, data)
// 国家国防科工局文章
export const reptileGjgfkgjContent = data => $fetch.post(`${service}/reptile/gjgfkgj/content`, data)
export const reptileGjgfkgjContentBatch = data => $fetch.post(`${service}/reptile/gjgfkgj/content/batch`, data)
export const reptileGjgfkgjList = data => $fetch.post(`${service}/reptile/gjgfkgj/list`, data)
// //
// export const getAfterLoginDetailUserByUserCode = data => $fetch.post(`${service}/adu/user/getAfterLoginDetailUserByUserCode`, data)
// // 退出登录
// export const getLogout = data => $fetch.post(`${service}/adu/login/bowOut`, data)
// // 企业社会信用代码是否已经存在
// export const aduRegisterCreditCodeIsExist = ({ creditCode }) => $fetch.get(`${service}/adu/register/creditCodeIsExist/${creditCode}`, { notShowLoading: true })
