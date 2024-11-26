import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel/Carousel';
import Search from '../components/Search';
import CategoriesHome from '../components/CategoriesHome';
import useExperiences from '../hooks/useExperience';
import ExperiencesList from '../components/Pagination/ExperiencesList';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { experiences, loading, fetchExperiences, error } = useExperiences();

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchExperiences(selectedCategories);
    } else {
      fetchExperiences();
    }
  }, [selectedCategories]);

  return (
    <div>
      <Banner />
      
      <section className='seachCategoriesContainer'>
        <Search />
        <CategoriesHome 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories} 
          fetchExperiences={fetchExperiences}
        />
      </section>

      
      <div className='top10-header'>
        <img src="/dotted_lines.svg" className='left-lines' alt="" />
        <div>
          <h2>TOP CAPI-EXPERIENCES</h2>
          <p>Favorite experiences based on our travelers</p>
        </div>
        <img src="/map.svg" alt="" className='banner-map-img' />
        <img src="/dotted_lines.svg" className='right-lines' alt="" />
      </div>



      <ExperiencesList experiences={experiences} />

      <section>
        <div className='home-carousel'>
          <div className='carouselHeader'>
            <p>meet experiences</p>
            <h2>You can't miss it!</h2>
          </div>
          <Carousel data={experiences} />
          <img src="/blue_wave_mobile.svg" alt="" className='waveMobile' />
          <img src="/blue_wave_desktop2.png" alt="" className='waveDesktop' />
        </div>
      </section>
    </div>
  );
};

export default Home;
