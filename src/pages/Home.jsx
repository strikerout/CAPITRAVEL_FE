import React from 'react'
import Banner from '../components/Banner'
import ProductCard from '../components/Cards/ProductCard'
import Carousel from '../components/Carousel/Carousel'

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

      <div className='desktopCars'>
        <div class="grid-container">
          {/* <!-- Fila 1 --> */}
          <div class="item item-1"><ProductCard id={"1"}/></div>
          <div class="item item-2"><ProductCard/></div>
          <div class="item item-3"><ProductCard/></div>
          
          {/* <!-- Fila 2 --> */}
          <div class="item item-4"><ProductCard/></div>
          <div class="item item-5"><ProductCard/></div>
          
          {/* <!-- Fila 3 --> */}
          <div class="item item-6"><ProductCard/></div>
          <div class="item item-7"><ProductCard/></div>
          <div class="item item-8"><ProductCard/></div>
          <div class="item item-9"><ProductCard/></div>
          
          {/* <!-- Fila 4 --> */}
          <div class="item item-10"><ProductCard/></div>
        </div>
      </div>
      

      <div className='home-carousel'>
        <img src="/blue_wave_mobile.svg" alt=""  className='waveMobile'/>
        <img src="/blue_wave_desktop.svg" alt="" className='waveDesktop' />
        <div className='carouselHeader'>
          <h2>You can't miss it!</h2>
          <p>meet experiences</p>
        </div>
      
        <Carousel/>
      </div>

      
      
    </div>
  )
}

export default Home
