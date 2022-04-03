import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import './home.less'
import { actions } from './store'
// @ts-ignore
import _ from 'loadsh'

const Home = () => {
  const dispatch = useDispatch()
  const handleIncrement = () => {
    const a = { a: 1, b: 2, c: 3, d: { d1: 4 } }
    const aCopy = _.cloneDeep(a)
    aCopy['x'] = 'y'
    console.log(_.isEqual(a, aCopy), 'this is :', a, 'this is aCopy:', aCopy)
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
