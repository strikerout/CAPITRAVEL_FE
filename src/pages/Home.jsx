import React from 'react'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'

const Home = () => {
  return (
    <div>
      <Banner/>
      <h2>TOP 10 EXPERIENCIAS</h2>
      <p>Experiencias basadas en nuestros viajeros</p>

      <ProductCard/>
    </div>
  )
}

export default Home
