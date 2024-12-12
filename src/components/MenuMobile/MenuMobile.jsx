import React from 'react'
import styles from './menuModule.module.scss'
import capi from '../../../public/capi_photo.svg'
import { useNavigate } from 'react-router-dom';

const MenuMobile = () => {
    const navigate = useNavigate();
  return (
       <div className={styles.dropdownMenuMobile}>
        <div className={styles.containerText}>
            <img src={capi} alt="" />
            <div>
                <h3>Hi!</h3>
                <p>I'm Capi, your tour guide. Log in or create your account to start this adventure.</p>
            </div>
        </div>
        <div className={styles.containerButtons}>
        <button className='secundary-button' onClick={() => navigate('/register')}>Create Account</button>
            <button className='primary-button' onClick={() => navigate('/login')}>Log In</button>
        </div>
        </div>
  )
}

export default MenuMobile
