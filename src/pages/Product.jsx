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
import useAuthLogin from "../hooks/useAuthLogin";
import Swal from "sweetalert2";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchExperienceByID } = useExperiences();
  const {
    fetchReservationDatesByExperience,
    createNewReservation,
    loading,
    error,
  } = useReservations();
  const { username } = useAuthLogin();
  const [experience, setExperience] = useState(null);
  const [reservations, setReservations] = useState([]);
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
        const data = await fetchReservationDatesByExperience(id);
        setReservations(data);
      } catch (err) {
        console.error("Error fetching reservation dates:", err);
      }
    };
    fetchReservations();
  }, [id]); 

  const handleReservation = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    if (!selectedDateTime) {
      Swal.fire({
        imageUrl: "/warningCapi.svg",
        imageWidth: 200,
        title: "Chek-In",
        text: "Please select a Check-In date",
        customClass: {
          confirmButton: "swalConfirmButton",
          title: "swalTitle",
          htmlContainer: "swalHtmlContainer",
        },
      });
      return;
    }

    try {
      const reservationData = {
        checkIn: selectedDateTime,
        experienceId: experience.id,
        email: username,
      };
      await createNewReservation(reservationData);

      const updatedReservations = await fetchReservationDatesByExperience(
        experience.id
      ); 
      setReservations(updatedReservations);
      setSelectedDateTime[""];
      Swal.fire({
        imageUrl: "/checkCapi.svg",
        imageWidth: 200,
        title: "Successfully!",
        text: "The reservation has been booked.",
        customClass: {
          confirmButton: "swalConfirmButton",
          title: "swalTitle",
          htmlContainer: "swalHtmlContainer",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/experiences/reservations");
        }
      });
    } catch (err) {
      console.log("Error creating reservation:", err.response.data.error);
      Swal.fire({
        imageUrl: "/errorCapi.svg",
        imageWidth: 200,
        title: err.response.data.error,
        text: "Error: " + err.status,
        customClass: {
          confirmButton: "swalConfirmButton",
          title: "swalTitle",
          htmlContainer: "swalHtmlContainer",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  if (!experience) return <div>Loading...</div>;

  return (
    <div className="product">
      <ProductHeader data={experience} />
       <ButtonShare product={experience}/>
       <ButtonFavorite experienceId={experience.id}/>
      <ProductGallery data={experience} />

      <div className="productDescRate">
        <ProductDescription data={experience} />
        <div className="rateAndBookContainer">

          <ProductRate rating={experience.reputation} ratingCount={experience.ratingCount}/>
          <div className="bookinContainer">
            <ExperienceDates
              data={experience}
              reservations={reservations}
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
      <Reviews experienceId={experience.id} />
    </div>
  );
};

export default Product;
