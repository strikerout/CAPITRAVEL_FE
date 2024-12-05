import React, { useState, useEffect } from "react";
import ProductHeader from '../components/ProductHeader/ProductHeader'
import useExperiences from '../hooks/useExperience'
import { useNavigate, useParams } from "react-router-dom";
import ConfirmBookHeader from "../components/ConfirmBookHeader/ConfirmBookHeader";
import ConfirmDatesBook from "../components/ConfirmDatesBook/ConfirmDatesBook";
import useReservations from "../hooks/useReservations";
import Swal from "sweetalert2";
import useAuthLogin from "../hooks/useAuthLogin";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import PolicyModal from "../components/ProductPolicy/PolicyModal";

const ConfirmBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!localStorage.getItem("token")) {
        localStorage.setItem("currentExperrience", id)
        navigate("/login");
   
      }

   
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
      localStorage.setItem("currentExperrience", id)
      navigate("/login");
      return null;
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
    <>
    <div className="confirmBooking">
    <ConfirmBookHeader data={experience} />

    <div className="confirmPanels">
        <div className="bookingContainer">
                <ConfirmDatesBook
                    data={experience}
                    reservations={reservations}
                    onDateTimeSelect={setSelectedDateTime}
                /> 
                    <PrimaryButton func={handleReservation} disabled={loading}>
                {loading ? "Booking..." : "Book Now"}
                </PrimaryButton>
            </div>
        
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
        </div>
    </div>
       
        
    </>
  )
}

export default ConfirmBooking
