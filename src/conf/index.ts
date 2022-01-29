export const base =  {
  development: {
    cdn: './',
    apiBaseUrl: 'http://localhost:8080/api/' // 开发环境接口请求，后用于 proxy 代理配置
  },
  production: {
    cdn: '//s.xxx.com/vite-react-app/release', // 正式环境 cdn 路径
    apiBaseUrl: 'http://xxxxssss:8080' // 正式环境接口地址
  }
}
