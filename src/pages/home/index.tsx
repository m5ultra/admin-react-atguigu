import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import './home.less'
import { actions } from './store'

const Home = () => {
  const dispatch = useDispatch()
  const handleIncrement = () => {
    dispatch(actions.incrementAction({ name: 'Dendi', age: 5 }))
  }
  // @ts-ignore
  const { num } = useSelector((x) => x.home)
  return (
    <>
      <Button onClick={handleIncrement}>
        INCREMENT ___&nbsp;&nbsp; <span style={{ color: 'red' }}>[{num}]</span>
      </Button>
      <h1 className="home">欢迎使用硅谷后台管理系统</h1>
    </>
  )
}
export default Home
