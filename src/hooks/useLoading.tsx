import { useState } from 'react'
import Loader from './loading'

const useLoader = () => {
  // 可以把是否显示loading的变量保存在全局状态管理容器中
  const [loading, setLoading] = useState(false)
  return [loading ? <Loader /> : null, () => setLoading(true), () => setLoading(false)]
}

export default useLoader
