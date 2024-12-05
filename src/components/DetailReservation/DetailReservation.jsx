import React, { useEffect, useState } from 'react'
import useExperiences from '../../hooks/useExperience';
import PolicyModal from '../ProductPolicy/PolicyModal';
import { useParams } from 'react-router-dom';

const DetailReservation = () => {
    const { id } = useParams();
    const { fetchExperienceByID } = useExperiences();


    const [experience, setExperience] = useState(null);
    const [errorExperience, setErrorExperience] = useState(null);

    useEffect(() => {
        const getExperience = async () => {
          try {
            const data = await fetchExperienceByID(id);
            setExperience(data);
          } catch (err) {
            setErrorExperience(err);
          }
        };
    
        getExperience();
      }, [id]);
      if (!experience) return <div>Loading...</div>;

  return (
    <div>
    <div className="bookingProductInfo">
        <img src={experience.images[0]} alt="" />
        <div>
            <h3>{experience.title}</h3>
            <div>
                <p>{experience.country}, {experience.ubication}</p>
            </div>
        </div>
    </div>

    <div>
        <h4>Characteristics</h4>
        <div>
            {experience.properties.map((property, index)=>(
                <>
                <img src={property.image} alt="" />
                <p>{property.name}</p>
                </>
            ))}
        </div>
    </div>
    
    <div>
        <PolicyModal/>
    </div>

</div>
  )
}

export default DetailReservation
