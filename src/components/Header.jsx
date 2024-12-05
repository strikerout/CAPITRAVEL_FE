import {Link, useNavigate} from 'react-router-dom';
import useAuthLogin from '../hooks/useAuthLogin';
import { useEffect, useState } from 'react';
import HeaderUserLogin from '../components/HeaderUserLogin/HeaderUserLogin'
import MenuMobile from './MenuMobile/MenuMobile';
import ClearButton from './Buttons/ClearButton';
import PrimaryButton from './Buttons/PrimaryButton';

const Header = ({id}) => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769); 
  const {checkToken, role, username, isTokenExpired} = useAuthLogin();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <header className=''>
      <div className='header-container'>
        <Link to='/' className='mobileLogo'>
          <img src="/capitravel_mobile.svg" alt="" className=''/>
        </Link>

        <div className='desktopLogo-container'>
        <Link to='/' className='desktopLogo'>
          <img src="/capitravel_desktop.svg" alt=""/>
        </Link>
        <Link to='/' className='desktopLogo'>
          <p>Capi is your guide</p>
        </Link>
        </div>
      
        {username ? 
        <div className='loggedUser'>
          <HeaderUserLogin email={username} role ={role} />
        </div>
        :
        <>
        <div className='mobileControl'  onClick={toggleMobileMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"/></g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"/></svg>
        </div>
        <div className='desktopControl'>
          <ClearButton func={()=>navigate('/register')}>Create Account</ClearButton>
          <PrimaryButton func={()=>navigate('/login')}>Log In</PrimaryButton>
        </div>
        </>
        }

        {/* Menú móvil */}
        {isMobileMenuOpen && isMobile &&(
         <MenuMobile/>
        )}
      </div>
    </header>
  )
}

export default Header
