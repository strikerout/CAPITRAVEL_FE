import './App.scss'
import Footer from './components/Footer/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import {Routes, Route, useLocation } from 'react-router-dom';
import Product from './pages/Product';
import AdminPanel from './pages/AdminPanel';
import CompleteGallery from './pages/CompleteGallery';
import Loading from './components/Loading';
import { Register } from './pages/Register';


function App() {

  const location = useLocation();
  const isRegisterOrLogin = location.pathname === '/register' || location.pathname === '/login';

  return (
    <>
    {!isRegisterOrLogin && <Header/>}
    <div className={"mainContent " + (isRegisterOrLogin ? ('headerFooterOff') : null) }>
    <Routes className={'body'}>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/gallery/:id' element={<CompleteGallery/>}/>
      <Route path='/administrator/*' element={<AdminPanel/>}/>
      <Route path='/register' element={<Register/>}/>

    </Routes>
    </div>
    
     {!isRegisterOrLogin && <Footer /> }
    </>

  )
}

export default App
