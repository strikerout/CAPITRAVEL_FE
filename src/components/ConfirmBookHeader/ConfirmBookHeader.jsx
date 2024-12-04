import React from 'react'
import style from './confirmBookHeader.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';


const ConfirmBookHeader = ({data}) => {
  const navigate = useNavigate();
  return (
    <div className={style.confirmBookHeader}>
      <div className={style.confirmBookTitle}>
        <div className={style.title}>
        <svg onClick={()=>navigate(-1)} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5"/></svg>
        <h3>Confirm your booking</h3>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBookHeader
