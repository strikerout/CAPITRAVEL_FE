import React from 'react'
import style from './pageHeader.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';


const PageHeader = ({title}) => {
  const navigate = useNavigate();
  return (
    <div className={style.confirmBookHeader} onClick={()=>navigate(-1)}>
      <div className={style.confirmBookTitle}>
        <div className={style.title}>
        <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5"/></svg>
        <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
