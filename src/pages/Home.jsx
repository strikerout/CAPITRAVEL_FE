import React from 'react'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel/Carousel'
import ExperiencesList from '../components/Pagination/ExperiencesList'

const Home = () => {
  return (
    <div>
      <Banner/>
      <div className='top10-header'>
         <img src="/dotted_lines.svg" className='left-lines' alt="" /> 
        <div>
          <h2>TOP 10 EXPERIENCES</h2>
          <p>Favorite experiences based on our travelers</p>
        </div>
        <img src="/map.svg" alt="" className='banner-map-img'/>
         <img src="/dotted_lines.svg" className='right-lines' alt="" /> 
      </div>
      
      <ExperiencesList/>
      
      <section>
        <div className='home-carousel'>
          <img src="/blue_wave_mobile.svg" alt="" className='waveMobile' />
          <img src="/blue_wave_desktop.svg" alt="" className='waveDesktop' />
          <div className='carouselHeader'>
            <h2>You can't miss it!</h2>
            <p>meet experiences</p>
          </div>

          <Carousel />
        </div>

      </section>
      

      
      
    </div>
  )
}

export default Home
