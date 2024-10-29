import React from 'react'
import style from './button.module.scss'

const PrimaryButton = ({children, func, type = "button"}) => {
  return (
    <button className={style.primaryButton} onClick={func} type={type}>{children}</button>
  )
}

export default PrimaryButton
