import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import ProductRate from '../components/ProductRate/ProductRate';
import useExperiences from '../hooks/useExperience'

const Product = () => {
  const {id} = useParams();
  const {fetchExperienceByID} = useExperiences();
  const [experience, setExperience] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExperience = async () => {
      try {
        const data = await fetchExperienceByID(id);
        setExperience(data);
      } catch (err) {
        setError(err);
      }
    };

    getExperience();
  }, [id])

  if (! experience) return <div>Loading...</div>;

  return (
    <div className='product'>
      <ProductHeader data={experience}/>

      <ProductGallery data={experience}/>

      <ProductDescription data={experience}/>

      <div className='rateAndBookContainer'>
        <ProductRate rating={experience.reputation}/>
        <PrimaryButton>Book Now</PrimaryButton>
      </div>
    </div>
  )
}

export default Product
