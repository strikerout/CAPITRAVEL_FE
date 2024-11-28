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
import ExperienceDates from "../components/ExperienceDates/ExperienceDates";

const Product = () => {
  const { id } = useParams();
  const { fetchExperienceByID } = useExperiences();
  const {
    fetchReservationDatesByExperience,
    createNewReservation,
    loading,
    error,
  } = useReservations();
  const [experience, setExperience] = useState(null);
  const [reservations, setReservations] = useState([]); // Estado para reservas
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

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await fetchReservationDatesByExperience(id); // Llamar a la función para obtener las reservas de la experiencia
        setReservations(data); // Actualizar el estado de las reservas
      } catch (err) {
        console.error("Error fetching reservation dates:", err);
      }
    };
    fetchReservations(); // Ejecutar la función
  }, [id]); // Dependencia de `experience.id`, se vuelve a ejecutar si cambia el ID de la experiencia

  const handleReservation = async () => {
    if (!selectedDateTime) {
      alert("Please select a date and time before booking.");
      return;
    }

    try {
      const reservationData = {
        checkIn: selectedDateTime,
        experienceId: experience.id,
        email: "fabiogadea21@gmail.com", // Esto es solo un ejemplo
      };
      await createNewReservation(reservationData); // Crear la nueva reserva en el backend

      // Actualizar el estado de las reservas y el calendario
      const updatedReservations = await fetchReservationDatesByExperience(
        experience.id
      ); // Llamar de nuevo para obtener las reservas actualizadas
      setReservations(updatedReservations); // Actualizar el estado local
      alert("Reservation successfully created!");
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("Failed to create reservation.");
    }
  };

  if (!experience) return <div>Loading...</div>;

  return (
    <div className="product">
      <ProductHeader data={experience} />

      <ProductGallery data={experience} />

      <div className="productDescRate">
        <ProductDescription data={experience} />
        <div className="rateAndBookContainer">
          <ProductRate rating={experience.reputation} />
          <div className="bookinContainer">
            <ExperienceDates
              data={experience}
              reservations={reservations} // Pasar reservas como prop
              onDateTimeSelect={setSelectedDateTime}
            />
            <PrimaryButton func={handleReservation} disabled={loading}>
              {loading ? "Booking..." : "Book Now"}
            </PrimaryButton>
          </div>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
      <PolicyModal />
    </div>
  );
};

export default Product;
