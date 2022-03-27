import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
const Home = () => {
  const dispatch = useDispatch()

  // @ts-ignore
  const { num, num2 } = useSelector((x) => x.a)
  const handleNumIncrement = () => {
    dispatch({ type: 'increment-counter', v: { step: 10 } })
  }
  return (
    <>
      <Button onClick={handleNumIncrement}>
        {num2} - Plus num - {num}
      </Button>
    </>
  )
}

export default Home
