import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
export default () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path={'/admin'} element={<Admin />} />
      </Routes>
    </Router>
  )
}
