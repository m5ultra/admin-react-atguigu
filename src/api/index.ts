import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as qs from 'qs'
import { base } from '../conf'
import { message } from 'antd'
/**
 * 1.初始化一个service
 * 2.可以自动取消请求 用户可以通过配置取消请求
 * 3.
 */
const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  // @ts-ignore
  baseURL: base[process.env.NODE_ENV].baseURL, // baseUrl e.g: http://localhost:8080/api/
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true, // 是否跨站点访问控制请求
  timeout: 30000, // 超时时间
  validateStatus() {
    // TODO 待验证（使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常）
    return true
  },
  transformRequest: [
    (data) => {
      // 处理data数据
      data = JSON.stringify(data)
      return data
    },
  ],
  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        // 处理返回
        data = JSON.parse(data)
      }
      return data
    },
  ],
})
service.defaults.headers.post['Content-Type'] = 'application/json'
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = localStorage.getItem('token') // 获取本地token
    if (token) {
      config.headers!.Authorization = `${token}`
    }
    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    // if (config.url!.includes('pur/contract/export')) {
    //   config.headers!['responseType'] = 'blob'
    // }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url!.includes('pur/contract/upload')) {
    //   config.headers!['Content-Type'] = 'multipart/form-data'
    // }
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
  },
)

service.interceptors.response.use(
  // 响应拦截器
  (response: AxiosResponse) => {
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      msg = showStatus(status)
      if (typeof response.data === 'string') {
        response.data = { msg }
      } else {
        response.data.msg = msg
      }
    }
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message)
    } else {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
      message.warning(error.data.msg)
    }
    return Promise.reject(error)
  },
)

export default service
