import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel/Carousel';
import CategoriesHome from '../components/Users/CategoriesHome/CategoriesHome';
import useExperiences from '../hooks/useExperience';
import ExperiencesList from '../components/Pagination/ExperiencesList';
import Message from "../components/Message/Message";


const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState({})
  const { experiences, loading, fetchExperiences, error } = useExperiences();
  localStorage.removeItem("currentExperrience")

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchExperiences(selectedCategories, search);
    } else {
      fetchExperiences();
    }
  }, [selectedCategories]);

  useEffect(() =>{
    if(Object.keys(search).length > 0){
      fetchExperiences(selectedCategories, search)
    }else{
      fetchExperiences();
    }
  }, [search])

  return (
    <div>
      <Banner search={search} setSearch={setSearch} />

      {Object.keys(search).length > 0 && experiences.length > 0 ? 
        <div className='searchResult'>
          <h2>Search result:</h2>
        </div>
      : null}

      { Object.keys(search).length === 0 ?
        <>
        <div className='top10-header'>
          <img src="/dotted_lines.svg" className='left-lines' alt="" />
          <div>
            <h2>TOP CAPI-EXPERIENCES</h2>
            <p>Favorite experiences based on our travelers</p>
          </div>
          <img src="/map.svg" alt="" className='banner-map-img' />
          <img src="/dotted_lines.svg" className='right-lines' alt="" />
        </div>

          <CategoriesHome 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories} 
          fetchExperiences={fetchExperiences}
          />
        </> : null
      }
      <br />

      <ExperiencesList experiences={experiences} />

      {/* if category is selected without expetiences asociated and the search is not active */}
      {selectedCategories && experiences.length === 0 && Object.keys(search).length === 0 ?
        <Message 
        message={"Ups! I couldn't find any experience related to these categories"} 
        recommendation={"Try with others"}
      /> 
      : 
      null
    }

    {/* if the search is active but no results */}
    {Object.keys(search).length > 0 && experiences.length === 0 ?
        <Message 
        message={"Ups! there seems to be no experiences"} 
        recommendation={"Try with other words, date or location"}
      /> 
      : 
      null
    }
           


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
