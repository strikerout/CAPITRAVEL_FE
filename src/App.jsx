import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import {Routes, Route } from 'react-router-dom';
import Product from './pages/Product';

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<Product/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
