import { useEffect, useState, MouseEvent } from 'react'
import './index.less'
import { getWeather } from '../../api'
import { useResolvedPath, useNavigate } from 'react-router-dom'
import menuList, { IMenuItem } from '../../conf/menu.config'
const Header = () => {
  const [data, setData] = useState({})
  const [title, setTitle] = useState('')
  // @ts-ignore
  useEffect(() => {
    let isUnmount = false
    ;(async () => {
      // @ts-ignore
      const [msg] = await getWeather()
      !isUnmount && setData(() => ({ ...msg }))
    })()
    return () => (isUnmount = true)
  }, [])
  const { pathname } = useResolvedPath(location.pathname)

  useEffect(() => {
    let title = ''
    const getTitle = (list: IMenuItem[]) => {
      list.map((item) => {
        if (item.key === pathname.substring(1)) {
          title = item.title
        }
        if (item.children) {
          getTitle(item.children)
        }
      })
    }
    getTitle(menuList)
    setTitle(title)
  })
  const navigator = useNavigate()
  const handleExit = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    localStorage.removeItem('user_key')
    localStorage.removeItem('currentPath')
    navigator('/login/', { replace: true })
  }
  return (
    <div className={'header'}>
      <div className="header-top">
        <span>欢迎，{JSON.parse(localStorage.getItem('user_key') as string)?.username}</span>
        <a className={'exit-text'} href="#" onClick={(e) => handleExit(e)}>
          退出
        </a>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right center-horizontally flex-end">
          {/*@ts-ignore*/}
          <span className="datetime">{data?.reporttime}</span>
          {/*@ts-ignore*/}
          <span className="city">{data?.city}</span>
          {/*@ts-ignore*/}
          <span>{data?.weather}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
