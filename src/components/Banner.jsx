import React from 'react'

const Banner = () => {
  return (
    <div className='banner'>
      <img src="/map.svg" alt="" className='banner-map-img'/>
      <div className='banner-grid'>
        <div className='banner-text-container'>
          <p className='banner-text'>Live unforgettable experiences,
          <br/>without complications.</p>
          <p className='banner-button'><b>+10.000 </b>  Happy Travelers!</p>
          <p className='banner-subtitle-desktop'>¡Hey! Soy tu Capibara de confianza. ¿Listo para la aventura?</p>
        </div>
        <img src="/capi_sun.svg" alt="" className='banner-capi-img'/>
      </div>  
    </div>
  )
}

export default Banner
