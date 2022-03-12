import Axios from './http'
import jsonp from 'jsonp'
import { message } from 'antd'
export const handleLogin = (username: string, password: string) =>
  Axios()({ url: 'login', data: { username, password } })

export const addUser = (user: unknown) => Axios()({ url: '/manage/user/add', data: user })

export const getWeather = () => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=440300&key=807def07808f69e6007fb46351345329&extensions=base&output=JSON`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // 如果成功了
      if (!err && data.info === 'OK') {
        // 取出需要的数据
        const {lives} = data
        resolve(lives)
      } else {
        // 如果失败了
        return message.error('获取天气信息失败!')
      }
    })
  })
}
