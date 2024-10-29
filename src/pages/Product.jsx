import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import ProductRate from '../components/ProductRate/ProductRate';

const Product = () => {
    const {id} = useParams();
    const navigate = useNavigate()
  return (
    <div className='product'>
      <ProductHeader info-={[]}/>

      <ProductGallery photos={[]}/>

      <ProductDescription info={[]}/>

      <div className='rateAndBookContainer'>
        <ProductRate rating={4.5}/>
        <PrimaryButton>Book Now</PrimaryButton>
      </div>
    </div>
  )
}

export default Product
