import React from 'react';
import styles from './ProductFooter.module.scss';

const Footer = () => {
  return (
    <footer className={styles.productFooter} >
      <div className={styles.footerTop}>
        <div className={styles.logoLem}>
          <img src="/capitravel_mobile.svg" alt="" className={styles.footerLogo} />
          <p> Capi is your guide</p>
        </div>
        <div className={styles.textCopy}>
          <p>Made with love ♡ by group 5</p>
          
        </div>
      </div>
      <div className={styles.footerBar}>
        <p>&copy; 2024 CapiTravel</p>
        <p> Final Project - Digital House</p>

      </div>

    </footer>
  )
}

export default Footer
