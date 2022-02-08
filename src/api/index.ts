import Axios from './http'

export const handleLogin = (username: string, password: string) => {
  return Axios()({ url: 'login', method: 'POST', data: { username, password } })
}

