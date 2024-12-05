import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductHeader from "../components/ProductHeader/ProductHeader";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ProductRate from "../components/ProductRate/ProductRate";
import useExperiences from "../hooks/useExperience";
import useReservations from "../hooks/useReservations";
import PolicyModal from "../components/ProductPolicy/PolicyModal";
import ButtonShare from "../components/Buttons/ButtonShare/ButtonShare";
import Reviews from "../components/Reviews/Reviews";
import ButtonFavorite from "../components/Buttons/ButtonFavorite/ButtonFavorite";
import ExperienceDates from "../components/ExperienceDates/ExperienceDates";


const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchExperienceByID, loading, error } = useExperiences();
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

  const checkLoggerUser = async () => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("currentExperrience", id)
      navigate("/login");
      return null;
    }else{
      navigate(`/confirmbooking/${experience.id}`)
    }
  };

  if (!experience) return <div>Loading...</div>;

  return (
    <div className="product">
      <ProductHeader data={experience} />
      <div className="containerButtonsActions">
        <div className="containerFavorites">
        <ButtonFavorite experienceId={experience.id}/>
        </div>
        <ButtonShare product={experience}/>
      </div>
      <ProductGallery data={experience} />

      <div className="productDescRate">
        <div>
        <ProductDescription data={experience}/>
        <PolicyModal/>
        <Reviews experienceId={experience.id} />
        </div>
    
        <div className="rateAndBookContainer">
        <ProductRate rating={experience.reputation} ratingCount={experience.ratingCount}/>
          <div className="bookinContainer">
            <ExperienceDates
              data={experience}
            />
              <PrimaryButton func={()=>checkLoggerUser()} disabled={loading}>
              Book Now
            </PrimaryButton>
          </div>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Product;
