import './index.less'

const Header = () => {
  return <div className={'header'}>
    <div className="header-top">
      <span>欢迎，Admin</span>
      <a className={'exit-text'} href="#" onClick={e => e.preventDefault()}>退出</a>
    </div>
    <div className="header-bottom">
      <div className="header-bottom-left">首页</div>
      <div className="header-bottom-right center-horizontally flex-end">
        <span className="datetime">2020-02-18 10:20:59</span>
        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
        <span>晴</span>
      </div>
    </div>
  </div>
}

export default Header
