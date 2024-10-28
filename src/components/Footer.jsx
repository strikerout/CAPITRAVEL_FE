import React from 'react';
import styles from './ProductFooter/ProductFooter.module.scss';

const Footer = () => {
  return (
    <footer className={styles.productFooter} >
      <div className={styles.footerTop}>
        <img src="public\capitravel_mobile.svg" alt="" className={styles.footerLogo} />
        <div className={styles.textCopy}>
          <p>Hecho con Amor por el grupo 5</p>
          <p>&copy; 2024 CapiTravel</p>
        </div>
      </div>
      <div className={styles.footerBar}>
        <img src="/github_logo.svg" alt="" />
        <p> Proyecto Integrador - Digital House</p>
      </div>

    </footer>
  )
}

export default Footer
