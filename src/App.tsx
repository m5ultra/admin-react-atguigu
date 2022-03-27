import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import useLoader from './hooks/useLoading'
import { Provider } from 'react-redux'
import store from './store'
export default () => {
  const [loader] = useLoader() //initialize useLoader hook
  return (
    <Provider store={store}>
      {loader}
      <Router>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/*'} element={<Admin />} />
        </Routes>
      </Router>
    </Provider>
  )
}
