import { useNavigate, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Sider, Content, Footer } = Layout

const Admin = () => {
  const navigate = useNavigate()
  const user = memoryUtils.user
  useEffect(() => {
    if (!user?._id) {
      return navigate('/')
    }
  }, [user?._id])
  // return <>{user?.username}</>
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ background: '#f2f2ff' }}>
          <Routes>
            <Route path={'/home'} element={<Home />} />
            <Route path={'products/category'} element={<Category />} />
            <Route path={'products/product'} element={<Product />} />
            <Route path={'/role'} element={<Role />} />
            <Route path={'/user'} element={<User />} />
            <Route path={'charts/bar'} element={<Bar />} />
            <Route path={'charts/line'} element={<Line />} />
            <Route path={'charts/pie'} element={<Pie />} />
          </Routes>
        </Content>
        <Footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#ccc',
            height: '30px',
          }}
        >
          推荐使用谷歌浏览器，可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Admin
