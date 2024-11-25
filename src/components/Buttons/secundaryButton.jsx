import React from 'react'
import style from './button.module.scss'

const SecundaryButton = ({children, func, type = "button"}) => {
  return (
    <button className={style.secundaryButton} onClick={func} type={type}> {children} </button>
  )
}
export default SecundaryButton
