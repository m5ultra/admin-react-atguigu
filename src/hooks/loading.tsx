import React from 'react'
import spinner from './loading.gif' // create gif from https://loading.io
import './loading.less'
const Loader = () => {
  return (
    <div className={'loadingContainer'}>
      <img className={'loadingImg'} src={spinner} alt={'Loading'} />
    </div>
  )
}
export default Loader
