import React from 'react'
import style from './button.module.scss'

const PrimaryButton = ({children}) => {
  return (
    <button className={style.primaryButton}>{children}</button>
  )
}

export default PrimaryButton
