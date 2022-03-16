import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import * as qs from 'qs'
import { base } from '../conf'
import { message } from 'antd'
// 处理错误信息
const showStatus = (status: number) => {
  let message: string
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
let loadingCount = 0 // 通过loadingCount控制是否显示loading
// 初始化map对象 pending
const pending = new Map()
// ...
const addPending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}
// ...
const removePending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
// 清除所有 pending
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
export enum Methods {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

// TODO 默认倒出一个参数 接受有些参数 做些默认配置...
const defaultConf = {
  isShowLoading: true,
  method: Methods.POST,
}

interface IConf {
  isShowLoading: boolean
  method: Partial<Methods>
}
export default (defConf: IConf = defaultConf) => {
  /**
   * 1. 初始化一个service
   * 2. 可以自动取消请求 用户可以通过配置取消请求 // https://developer.huawei.com/consumer/cn/forum/topic/0202545523679410023 // TODO 待验证
   * 3. 处理返回数据
   * 4. 异常统一处理
   * 5. 增加一层统一处理数据 把所有请求单独放一个文件
   * 6. 持续优化 比如抽成小文件...
   */
  // @ts-ignore
  const { baseURL } = base[process.env.NODE_ENV]
  const service: AxiosInstance = axios.create({
    // @ts-ignore
    baseURL, // baseUrl e.g: http://localhost:8080/api/
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
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
  // service.defaults.headers.post['Content-Type'] = 'application/json'
  service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      loadingCount++
      removePending(config) // 在请求开始前，对之前的请求做检查取消操作
      addPending(config) // 将当前请求添加到 pending 中
      const token = localStorage.getItem('token') // 获取本地token
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
      return Object.assign({}, config, defConf)
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
    async (response: AxiosResponse) => {
      loadingCount--
      removePending(response) // 在请求结束后，移除本次请求
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
      if (+response.data.status === 0) {
        return response.data
      } else if (+response.data.status === 1) {
        await message.warning(response.data.msg)
        return response.data.msg
      }
    },
    async (error) => {
      if (axios.isCancel(error)) {
        console.info('repeated request: ' + error.message)
      } else {
        // 错误抛到业务代码
        error.data = {}
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
        await message.warning(error.data.msg)
      }
      return Promise.reject(error)
    },
  )

  return service
}
