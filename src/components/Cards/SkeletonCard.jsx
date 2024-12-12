import React from 'react'
import styles from "./ProductCard.module.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import ContentLoader from "react-content-loader"
import { ColorRing } from 'react-loader-spinner'

const SkeletonCard = () => {
  return (
    <>
    <div  className={styles.productCard}>
      <div className={styles.productImg + " productImg"}>
        
        <div className={styles.imageSkeleton} >
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        </div> 


      </div>
      <div className={styles.cardTitles + " cardTitles"}>
        <h4>
            <ContentLoader 
                speed={1}
                width={300}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#bdbdbd"
                foregroundColor="#ecebeb"
            >
                <rect x="5" y="0" rx="4" ry="4" width="230" height="12" />
                <rect x="5" y="40" rx="3" ry="3" width="150" height="12" /> 
            </ContentLoader>
        </h4>
        <div className={styles.cardProperties + " cardProperties"}>
          <div className="property">

          </div>
        </div>
      </div>
      
    </div> 
    </>
  )
}

export default SkeletonCard
