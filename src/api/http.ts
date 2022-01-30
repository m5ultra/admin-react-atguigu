import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as qs from 'qs'
import {base} from "../conf"

/**
 * 1.初始化一个service
 * 2.
 */
const service = axios.create({
  baseURL: base[process.env.NODE_ENV].baseURL, // baseUrl e.g: http://localhost:8080/api/
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    token: 'token...',
  },
  withCredentials: true,  // 是否跨站点访问控制请求
  timeout: 30000, // 超时时间
  validateStatus() {  // TODO 待验证（使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常）
    return true
  },
  transformRequest: [(data) => { // 处理data数据
    data = JSON.stringify(data)
    return data
  }],
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) { // 处理返回
      data = JSON.parse(data)
    }
    return data
  }]
})
