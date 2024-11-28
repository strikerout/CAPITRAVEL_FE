import React from 'react'
import style from './ProductHeader.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonFavorite from '../Buttons/ButtonFavorite/ButtonFavorite';


const ProductHeader = ({data}) => {
  const navigate = useNavigate();
  return (
    <div className={style.productHeader}>
      <div className={style.productTitle}>
        <svg onClick={()=>navigate(-1)} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5"/></svg>
        <h3>{data.title}</h3>
      </div>

      <div>
        <div className={style.productLocation}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"/></svg>
            <p>{data.ubication + ", "+ data.country}</p>
        </div>

        <div className={style.productcategories}>
          {data.categories.map((category, index)=>(
            <p key={index} className={style.mainCategory}>{category.name}</p>
          ))}
        </div>
      </div>

      
    </div>
  )
}

export default ProductHeader
