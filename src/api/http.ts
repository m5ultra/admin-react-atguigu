import axios from 'axios'
import * as qs from 'qs'
import { base } from '../conf'
const defaultOptions = {
  // @ts-ignore
  baseURL: base[process.env.NODE_ENV].apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    token: 'this is token todo',
  },
}
axios.interceptors.request.use(
  (config: any): any => {
    Object.assign(config, defaultOptions)
    console.log(config, 'axios.interceptors.request')
    // 处理data数据
    config.transformRequest = [
      (data: any) => {
        return qs.stringify(data, {
          allowDots: true,
        })
      },
    ]
    // 处理query参数
    config.paramsSerializer = (params: any) => {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
      })
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response: any): any => {
    const { data } = response
    console.log(data, 'axios.interceptors.response')
    if (data.code === 2) {
      window.location.href = ``
    }
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

export default axios
