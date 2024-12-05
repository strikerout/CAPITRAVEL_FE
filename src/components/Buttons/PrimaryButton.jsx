import React from 'react'
import style from './button.module.scss'

const PrimaryButton = ({children, func, type = "button", disabled = ""}) => {
  return (
    <button className={style.primaryButton} onClick={func} type={type} disabled={disabled}>{children}</button>
  )
}

export default PrimaryButton
