import React, { useState } from 'react'
import Banner from '../components/Banner'
import ProductCard from '../components/Cards/ProductCard'
import Carousel from '../components/Carousel/Carousel'
import Search from '../components/Search'
import CategoriesHome from '../components/CategoriesHome'
import useExperiences from '../hooks/useExperience'


const Home = () => {
  const {experiences, loading} = useExperiences();
  let index = 1;

  return (
    <div>
      <Search/>
      <CategoriesHome/>
      <Banner/>

      
      <div className='top10-header'>
         <img src="/dotted_lines.svg" className='left-lines' alt="" /> 
        <div>
          <h2>TOP CAPI-EXPERIENCES</h2>
          <p>Favorite experiences based on our travelers</p>
        </div>
        <img src="/map.svg" alt="" className='banner-map-img'/>
         <img src="/dotted_lines.svg" className='right-lines' alt="" /> 
      </div>

      <div className='desktopCars'>
        {loading ? null :
          <div className="grid-container">

          {/* <!-- Fila 1 --> */}
          {experiences.slice(0, 3).map((experience)=>(
              <div key={experience.id} className={'item' + ' ' + 'item-'+(index++)}><ProductCard data={experience}/></div>
          ))}

 
          
          {/* <!-- Fila 2 --> */}
          {experiences.slice(3, 5).map((experience)=>(
              <div key={experience.id}  className={'item' + ' ' + 'item-'+(index++)}><ProductCard data={experience}/></div>
          ))}


          {/* <!-- Fila 3 --> */}
          {experiences.slice(5, 8).map((experience)=>(
              <div key={experience.id}   className={'item' + ' ' + 'item-'+(index++)}><ProductCard data={experience}/></div>
          ))}

          
          {/* <!-- Fila 4 --> */}
          {experiences.slice(8, 10).map((experience)=>(
              <div key={experience.id}  className={'item' + ' ' + 'item-'+(index++)}><ProductCard data={experience}/></div>
          ))}
        </div>
        }
        
      </div>
      
      <section>
        <div className='home-carousel'>
          <img src="/blue_wave_mobile.svg" alt="" className='waveMobile' />
          <img src="/blue_wave_desktop.svg" alt="" className='waveDesktop' />
          <div className='carouselHeader'>
            <h2>You can't miss it!</h2>
            <p>meet experiences</p>
          </div>

          <Carousel data={experiences}/>
        </div>

      </section>
      

      
      
    </div>
  )
}

export default Home
