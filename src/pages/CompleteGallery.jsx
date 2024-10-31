import React, { useState, useEffect} from 'react'
import useExperiences from '../hooks/useExperience';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CompleteGallery = () => {
    const {id} = useParams();
    const {fetchExperienceByID, loading, error} = useExperiences();
    const [experience , setExperience] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const getExperience = async () => {
          try {
            const data = await fetchExperienceByID(id);
            setExperience(data);
          } catch (err) {
            setExperience(err);
          }
        };
    
        getExperience();
      }, [id])

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      

  return (
    <div className='largeGallery'>
        <div className='galleryTitle'>
            <svg onClick={()=>navigate(-1)} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5"/></svg>
            <h3>{experience.title}</h3>
        </div>
        {experience? 
        experience.images.map((image, index)=>(
            <img key={index} src={image} alt="" />
        ))

        : null
    }
    </div>
  )
}

export default CompleteGallery;


