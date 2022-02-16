import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {Fragment, useEffect, useState} from 'react'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons'

import './index.less'
import Logo from '../../assets/images/logo.png'
const { SubMenu } = Menu

const LeftNav = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin')
  }, [])
  return (
    <Fragment>
      <Link to={'/'} className={'left-nav'}>
        <div className="left-nav-header">
          <img src={Logo} alt="LOGO" />
          <h1>谷粒后台</h1>
        </div>
      </Link>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
         <Link to={'/'}> 首页</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="2">
            <Link to={'category'}>品类管理</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={'product'}>商品管理</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Fragment>
  )
}
export default LeftNav
