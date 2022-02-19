import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { Fragment, useEffect } from 'react'
import menuList, { IMenuItem, IMenuChild } from '../../conf/menu.config'
import './index.less'
import Logo from '../../assets/images/logo.png'
const { SubMenu } = Menu
const LeftNav = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin/home')
  }, [])

  // 生成左侧菜单
  const getMenuNodes = (menuList: IMenuItem[]) => {
    return menuList.map((item: IMenuItem) =>
      item?.children?.length ? (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {/*{item.children.map((c: IMenuChild) => (*/}
          {/*  <Menu.Item key={c.key} icon={c.icon}>*/}
          {/*    <Link to={c.key}>{c.title}</Link>*/}
          {/*  </Menu.Item>*/}
          {/*))}*/}
          {getMenuNodes(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}> {item.title}</Link>{' '}
        </Menu.Item>
      ),
    )
  }

  return (
    <Fragment>
      <Link to={'/admin/home'} className={'left-nav'}>
        <div className="left-nav-header">
          <img src={Logo} alt="LOGO" />
          <h1>異星災變2</h1>
        </div>
      </Link>
      <Menu defaultSelectedKeys={['home']} defaultOpenKeys={['products']} mode="inline" theme="dark">
        {getMenuNodes(menuList)}
      </Menu>
    </Fragment>
  )
}
export default LeftNav
