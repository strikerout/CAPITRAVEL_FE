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
        <div className="grid-container">
          {/* <!-- Fila 1 --> */}
          <div className="item item-1"><ProductCard id={"1"}/></div>
          <div className="item item-2"><ProductCard/></div>
          <div className="item item-3"><ProductCard/></div>
          
          {/* <!-- Fila 2 --> */}
          <div className="item item-4"><ProductCard/></div>
          <div className="item item-5"><ProductCard/></div>
          
          {/* <!-- Fila 3 --> */}
          <div className="item item-6"><ProductCard/></div>
          <div className="item item-7"><ProductCard/></div>
          <div className="item item-8"><ProductCard/></div>
          <div className="item item-9"><ProductCard/></div>
          
          {/* <!-- Fila 4 --> */}
          <div className="item item-10"><ProductCard/></div>
        </div>
      </div>
      
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
