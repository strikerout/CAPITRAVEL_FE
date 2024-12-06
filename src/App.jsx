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
import Login from './pages/Login';
import Favorites from './pages/Favorites/Favorites';
import Reservations from './pages/Reservations/Reservations';
import ConfirmBooking from './pages/ConfirmBooking';
import ContactButton from './components/Buttons/ContactButton/ContactButton';
import NotFound from './pages/NotFound/NotFound';
import { Navigate } from 'react-router-dom';
import ReservationDetails from './pages/ReservationDetails';

function App() {

  const location = useLocation();
  const isRegisterOrLogin = location.pathname === '/register' || location.pathname === '/login';

  const isExcludedRoute =
  location.pathname === '/register' ||
  location.pathname === '/login' ||
  location.pathname.startsWith('/administrator');

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
      <Route path='/login' element={<Login/>}/>
      <Route path='/experiences/favorites' element={<Favorites />}/>
      <Route path='/reservations' element={<Reservations />}/> 
      <Route path='/confirmbooking/:id' element={<ConfirmBooking/>}/>
      <Route path="/not_found" element={<NotFound />} />
      <Route path='/reservation/details/:id' element={<ReservationDetails/>}/>
      <Route path='*' element={<Navigate to="/not_found"/>} />
    </Routes>
    </div>
     {!isExcludedRoute && <ContactButton />}
     {!isRegisterOrLogin && <Footer /> }
    </>
  )
}

export default App
