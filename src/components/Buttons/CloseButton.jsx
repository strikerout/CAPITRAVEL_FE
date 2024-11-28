import React from 'react'
import style from './button.module.scss'

const CloseButton = ({children, func, type = "button"}) => {
  return (
    <button className={style.closeButton} onClick={func} type={type}>✕{children}</button>
  )
}

export default CloseButton
