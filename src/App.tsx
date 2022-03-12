import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import useLoader from './hooks/useLoading'
export default () => {
  const [loader] = useLoader() //initialize useLoader hook
  return (
    <>
      {loader}
      <Router>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/*'} element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}
