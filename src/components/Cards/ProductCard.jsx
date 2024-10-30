import React from 'react'
import styles from './ProductCard.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useExperiences from '../../hooks/useExperience'

const ProductCard = ({data}) => {
  const {loading, error, fetchExperienceByID} = useExperiences();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // "https://i.pinimg.com/originals/56/dd/e4/56dde41aee17e96425987f751a9269ce.jpg"

  return (
    <>
    {data ? <Link to={`/product/${data.id}`} className={styles.productCard}>
      <div className={styles.productImg + ' productImg'}>
        <img src={data.images[0]} alt="" />
      </div>
      <div className={styles.cardTitles + ' cardTitles'}>
        <h4>{data.title}</h4>
        <div className={styles.cardProperties + ' cardProperties'}>
          <div className='property'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
            <p>{data.reputation}</p>
          </div>
          <div className='property'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"/></svg>
            <p>{data.ubication + ", "+ data.country}</p>
          </div>
        </div>
        
      </div>
      <div className={styles.cardArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6"/></svg>
      </div>
   
    </Link> 
    :
    <p>Data not found</p>
    }
     
    
    </>
   
  )
}

export default ProductCard
