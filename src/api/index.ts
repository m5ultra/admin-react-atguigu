import Axios from './http'

export const handleLogin = (username: string, password: string) =>
  Axios()({ url: 'login', data: { username, password } })

export const addUser = (user: unknown) => Axios()({ url: '/manage/user/add', data: user })
