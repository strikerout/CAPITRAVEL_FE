import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductHeader from "../components/ProductHeader/ProductHeader";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ProductRate from "../components/ProductRate/ProductRate";
import useExperiences from "../hooks/useExperience";
import useReservations from "../hooks/useReservations";
import PolicyModal from "../components/ProductPolicy/PolicyModal";
import ExperienceDates from "../components/ExperienceDates/ExperienceDates"

const Product = () => {
  const { id } = useParams();
  const { fetchExperienceByID } = useExperiences();
  const { createNewReservation, loading, error } = useReservations();
  const [experience, setExperience] = useState(null);
  const [errorExperience, setErrorExperience] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

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

  const handleReservation = async () => {
    if (!selectedDateTime) {
      alert("Please select a date and time before booking.");
      return;
    }



    try {
      const reservationData = {
        checkIn: selectedDateTime,
        experienceId: experience.id,
        email: "fabiogadea21@gmail.com", 
      };
      await createNewReservation(reservationData);
      alert("Reservation successfully created!");
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("Failed to create reservation.");
    }
  };

  return (
    <div className="product">
      <ProductHeader data={experience} />

      <ProductGallery data={experience} />

      <div className="productDescRate">
        <ProductDescription data={experience} />
        <div className="rateAndBookContainer">
          <ProductRate rating={experience.reputation} />
          <ExperienceDates
            data={experience}
            onDateTimeSelect={setSelectedDateTime}
            />
          <PrimaryButton func={handleReservation} disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </PrimaryButton>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
      <PolicyModal />
    </div>
  );
};

export default Product;
