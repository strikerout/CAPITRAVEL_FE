import React from 'react'
import style from './ProductRate.module.scss'

const ProductRate = ({rating, ratingCount}) => {
  return (
    <div className={style.productRate}>
    {rating > 0 
        ? "This experience is rated with" 
        : "No reviews yet"}
    <div className={style.property}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
        <p>{rating > 0 ? rating : "Be the first to review!"}</p>
        {ratingCount > 0 && <p className={style.ratingCount}>Reviews {ratingCount}</p>}
    </div>
      <img src="/capi_sunglasses.svg" alt="" />
  </div>
  )
}

export default ProductRate;
