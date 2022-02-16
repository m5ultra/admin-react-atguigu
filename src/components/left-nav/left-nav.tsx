import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Fragment, useState } from 'react'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons'

import './index.less'
import Logo from '../../assets/images/logo.png'
const { SubMenu } = Menu

const LeftNav = () => {
  const [collapsed, setCollapsed] = useState(true)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
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
          首页
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="2">品类管理</Menu.Item>
          <Menu.Item key="3">商品管理</Menu.Item>
        </SubMenu>
      </Menu>
    </Fragment>
  )
}
export default LeftNav
