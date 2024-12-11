import React, { useEffect, useState } from 'react';
import useReservations from '../../hooks/useReservations';
import Swal from 'sweetalert2';
import useAuthLogin from '../../hooks/useAuthLogin';
import style from './reservation.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import RatingForm from '../../components/RatingForm/RatingForm';
import useExperiences from '../../hooks/useExperience';
import PageHeader from "../../components/PageHeader/PageHeader"

const Reservations = () => {
  const { reservations, loading, error, fetchReservationsByUser, removeReservation } = useReservations();
  const { isAlreadyReviewed } = useExperiences();
  const { username } = useAuthLogin();
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState({});

  useEffect(() => {
    console.log('Username:', username); 
    fetchReservationsByUser(username);
  }, [username]);

  useEffect(() => {
    const checkReviewStatuses = async () => {
      const statuses = {};
      console.log('Reservations:', reservations);
      for (const reservation of reservations) {
        try {
          const reviewed = await isAlreadyReviewed(reservation.experience.id, username);
          if (reviewed !== true && reviewed !== false) {
            statuses[reservation.experience.id] = false;  // Asigna un valor predeterminado en vez de salir
          } else {
            statuses[reservation.experience.id] = reviewed || false;
          }
        } catch (error) {
          console.error(`Error checking review status for ${reservation.experience.id}:`, error);
          statuses[reservation.experience.id] = false;
        }
      }      
      console.log(statuses);
      
      setReviewStatus(statuses);
    };

    if (reservations.length > 0) {
      checkReviewStatuses();
    }
    console.log();
    
  }, [reservations]);

  const getReservationStatus = (checkIn, checkOut) => {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
  
    if (checkOutDate < today) {
      return 'Past'; 
    } else if (checkInDate > today) {
      return 'Upcoming';
    } else if (checkInDate <= today && checkOutDate >= today) {
      return 'Currently';
    }
  };

  const handleRemoveReservation = (id) => {
    Swal.fire({
      imageUrl: '/warningCapi.svg',
      imageWidth: 200,
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'swalConfirmButton',
        cancelButton: 'swalCancelButton',
        title: 'swalTitle',
        htmlContainer: 'swalHtmlContainer',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const error = await removeReservation(id);
          if (error) {
            Swal.fire({
              imageUrl: '/errorCapi.svg',
              imageWidth: 200,
              title: error.data.error,
              text: 'Error: ' + error.status,
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              },
            });
          } else {
            Swal.fire({
              imageUrl: '/checkCapi.svg',
              imageWidth: 200,
              title: 'Deleted!',
              text: 'The reservation has been deleted.',
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              },
            });
            fetchReservationsByUser();
          }
        } catch (error) {
          Swal.fire({
            imageUrl: '/errorCapi.svg',
            imageWidth: 200,
            title: 'Error deleting reservation',
            text: error.message,
            customClass: {
              confirmButton: 'swalConfirmButton',
              title: 'swalTitle',
              htmlContainer: 'swalHtmlContainer',
            },
          });
        }
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(reservations);

  return (
    <section className={style.containerPage}>
      <div className={style.titleSection}>
        <PageHeader title={"Back"}/>
        <div className={style.containerText}>
          <div>
            <h2>
              {reservations && reservations.length > 0
                ? 'Booked experiences'
                : 'Add experiences to your reservations'}
            </h2>
            <p>
              {reservations && reservations.length > 0
                ? 'What great choices!'
                : 'There’s nothing saved yet.'}
            </p>
          </div>
        </div>
      </div>
      <div className={style.tableContainer}>
        <div className={style.adminList}>
          <div className={`${style.headerList} ${style.reservationsList}`}>
            <h4>ID</h4>
            <h4>Experience</h4>
            <h4>Check-In</h4>
            <h4>Check-Out</h4>
            <h4>Status</h4>
            <h4>Review</h4>
  
          </div>
          <ul className={`${style.bodyList} ${style.reservationsBody}`}>
            {reservations.map((reservation) => (
              <li key={reservation.id} className={style.row}>
                <div className={style.infoDiv}>
                  <h4>ID: </h4><p>{reservation.id}</p>
                </div>

                <div className={style.infoDiv}>
                  <h4>Experience: </h4><Link to={`/product/${reservation.experience.id}`} className={style.experienceLink}>
                    <span className={style.experienceText}>{reservation.experience.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="18px" fill="#5f6368" className={style.icon}>
                      <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                    </svg>
                  </Link>
                </div>
                
                <div className={style.infoDiv}>
                  <h4>Check-In: </h4><p>{new Date(reservation.checkIn).toLocaleString()}</p>
                </div>
               
               <div className={style.infoDiv}>
                <h4>Check-Out: </h4><p>{new Date(reservation.checkOut).toLocaleString()}</p>
               </div>
                
              <div className={style.infoDiv}>
                <h4>Status: </h4><p className={
                    getReservationStatus(reservation.checkIn, reservation.checkOut) === 'Past'
                      ? style.past
                      : getReservationStatus(reservation.checkIn, reservation.checkOut) === 'Upcoming'
                        ? style.upcoming
                        : style.today
                  }>
                    {getReservationStatus(reservation.checkIn, reservation.checkOut)}
                  </p>
              </div>

              <div className={style.infoDiv}>
                <h4>Review:</h4>
                  {
                    getReservationStatus(reservation.checkIn, reservation.checkOut) !== 'Past' ? (
                      <p>Evaluate until finished</p> 
                    ) : reviewStatus[reservation.experience.id] != undefined && reviewStatus[reservation.experience.id] != true ? ( 
                      <RatingForm experience={reservation.experience} />
                    ) : (
                      <p>Reviewed</p> 
                    )
                  }
              </div>

              <div className={style.actionDiv}>
                <Link  to={`/reservation/details/${reservation.id}`} className={style.eyeIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/>
                  </svg>
                </Link>
     
               <svg
                    onClick={() => handleRemoveReservation(reservation.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="currentColor"
                      d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5"
                    />
                  </svg>
              </div>

              </li>

            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
