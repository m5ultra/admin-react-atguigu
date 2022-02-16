import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { Fragment, useEffect } from 'react'
import menuList from '../../conf/menu.config'
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
      <Menu defaultSelectedKeys={['home']} defaultOpenKeys={['products']} mode="inline" theme="dark">
        {menuList.map((item) => {
          // 生成左侧菜单
          return item?.children?.length ? (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {item?.children?.map((c) => (
                <Menu.Item key={c.key}>
                  <Link to={c.key}>{c.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}> {item.title}</Link>{' '}
            </Menu.Item>
          )
        })}
      </Menu>
    </Fragment>
  )
}
export default LeftNav
