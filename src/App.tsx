import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import useLoader from './hooks/useLoading'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
export default () => {
  const [loader] = useLoader() //initialize useLoader hook
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {loader}
        <Router>
          <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/*'} element={<Admin />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}
