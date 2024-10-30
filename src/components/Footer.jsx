import React from 'react';
import styles from './ProductFooter/ProductFooter.module.scss';

const Footer = () => {
  return (
    <footer className={styles.productFooter} >
      <div className={styles.footerTop}>
        <div className={styles.logoLem}>
          <img src="public\capitravel_mobile.svg" alt="" className={styles.footerLogo} />
          <p> Capi is your guide</p>
        </div>
        <div className={styles.textCopy}>
          <p>Hecho con Amor por el grupo 5</p>
          
        </div>
      </div>
      <div className={styles.footerBar}>
        <p>&copy; 2024 CapiTravel</p>
        <p> Proyecto Integrador - Digital House</p>

      </div>

    </footer>
  )
}

export default Footer
