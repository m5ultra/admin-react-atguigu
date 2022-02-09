import { useNavigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { useEffect } from 'react'

const Admin = () => {
  const navigate = useNavigate()
  const user = memoryUtils.user
  useEffect(() => {
    if (!user._id) {
      return navigate('/')
    }
  }, [user._id])
  return <>{user.username}</>
}

export default Admin
