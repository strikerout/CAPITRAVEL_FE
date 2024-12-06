import React, { useState, useEffect } from "react";
import ProductHeader from '../components/ProductHeader/ProductHeader'
import useExperiences from '../hooks/useExperience'
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import ConfirmDatesBook from "../components/ConfirmDatesBook/ConfirmDatesBook";
import useReservations from "../hooks/useReservations";
import Swal from "sweetalert2";
import useAuthLogin from "../hooks/useAuthLogin";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import PolicyModal from "../components/ProductPolicy/PolicyModal";
import Loading from "../components/Loading";

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
  const [reservationBooked, setReservationBooked] = useState([])

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
      const newReservation = await createNewReservation(reservationData);
      setReservationBooked(newReservation);

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
          console.log(reservationBooked);
          navigate(`/reservation/details/${newReservation.id}`);
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

  if (!experience) return <Loading/>;
  return (
    <div className="pageContainer">
    <PageHeader title={"Confirm reservation"} />

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
        
            <div className="bookingProductInfo">
                <div className="headerProductInfo">
                    <div className="containerImg">
                    <img src={experience.images[0]} alt="" />
                    </div>
                    <div className="ProductInfoTitle">
                        <h3>{experience.title}</h3>
                        <div className="productLocation">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"/></svg>
                        <p>{experience.country}, {experience.ubication}</p>
                        </div>
                        <div className="productDuration">
                          <p className="subtext">Duration</p>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-4a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4z" clipRule="evenodd"/></svg>
                            <p>{experience.quantity} {experience.timeUnit.toLowerCase()}</p>
                            </div>  
                        </div>
                    </div>
                </div>

                <div className="productProperties">
                    <h4>Properties</h4>
                    <div className="containerProperties">
                        {experience.properties.map((property, index)=>(
                            <div>
                            <img src={property.image} alt="" />
                            <p>{property.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <PolicyModal/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ConfirmBooking
