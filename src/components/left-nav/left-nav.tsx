import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import menuList, { IMenuItem } from '../../conf/menu.config'
import './index.less'
import Logo from '../../assets/images/logo.png'
const { SubMenu } = Menu
const LeftNav = () => {
  const [selectedKeys, setSelectedKeys] = useState(['home'])
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin/home')
  }, [])

  // 生成左侧菜单 map + 递归（Recursion）
  const getMenuNodes = (menuList: IMenuItem[]) => {
    return menuList.map((item: IMenuItem) =>
      item?.children?.length ? (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {getMenuNodes(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}> {item.title}</Link>{' '}
        </Menu.Item>
      ),
    )
  }
  // 生成左侧菜单第二中方法 reduce + 递归 （Recursion）
  const getMenuNodes2 = (menuList: IMenuItem[]) => {
    // reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)
    return menuList.reduce((v: ReactNode[], item) => {
      if (!item.children) {
        v.push(
          <Menu.Item onClick={() => setSelectedKeys([item.key])} key={item.key} icon={item.icon}>
            <Link to={item.key}> {item.title}</Link>{' '}
          </Menu.Item>,
        )
      } else {
        v.push(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {getMenuNodes2(item.children)}
          </SubMenu>,
        )
      }
      return v
    }, [])
  }

  return (
    <Fragment>
      <Link to={'/admin/home'} onClick={() => setSelectedKeys(['home'])} className={'left-nav'}>
        <div className="left-nav-header">
          <img src={Logo} alt="LOGO" />
          <h1>異星災變2</h1>
        </div>
      </Link>
      <Menu
        defaultSelectedKeys={['home']}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['products']}
        mode="inline"
        theme="dark"
      >
        {getMenuNodes2(menuList)}
      </Menu>
    </Fragment>
  )
}
export default LeftNav
