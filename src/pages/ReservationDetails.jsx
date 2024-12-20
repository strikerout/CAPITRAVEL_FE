import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader/PageHeader'
import PolicyModal from '../components/ProductPolicy/PolicyModal'
import useReservations from '../hooks/useReservations'
import { useNavigate, useParams } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import Loading from '../components/Loading';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFileDownload } from 'react-icons/fa';

const ReservationDetails = () => {
  const navigate = useNavigate();
  const {fetchReservationById, reservations, loading, error} = useReservations();
  const { id } = useParams();

  const [dateTime, setDateTime] = useState();


  useEffect(() => {
      try {
        fetchReservationById(id) 
        console.log(reservations);
      } catch (err) { 
        console.log(err); 
      };
  }, [id]); 

 
  function formatDateTime(datetime) {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convertir a formato de 12 horas y evitar 0
    return `${day}/${month}/${year} - ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

const generatePDF = async () => {
  const element = document.getElementById("content-to-pdf");
  if (!element) {
    console.error("Content not found to generate PDF file.");
    return;
  }

  const elementToExclude = element.querySelector(".exclude-from-pdf");
  elementToExclude.classList.add("hidden-for-pdf"); 


  const margin = 10;
  const pageWidth = 210; 
  const pageHeight = 297; 
  const contentWidth = pageWidth - margin * 2;
  const contentHeight = pageHeight - margin * 2; 

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const pageHeightPx = (canvasWidth / contentWidth) * contentHeight;

    let pdf = new jsPDF("p", "mm", "a4");

    let position = 0;
    while (position < canvasHeight) {
      const canvasPart = canvas
        .getContext("2d")
        .getImageData(0, position, canvasWidth, pageHeightPx);

      const canvasPartImage = document.createElement("canvas");
      canvasPartImage.width = canvasWidth;
      canvasPartImage.height = pageHeightPx;
      canvasPartImage.getContext("2d").putImageData(canvasPart, 0, 0);

      const imgData = canvasPartImage.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", margin, margin, contentWidth, contentHeight);

      position += pageHeightPx;

      if (position < canvasHeight) {
        pdf.addPage();
      }
    }

    pdf.save(reservations[0].experience.title +" - "+reservations[0].user.email+".pdf");

    elementToExclude.classList.remove("hidden-for-pdf"); 
  } catch (error) {
    console.error("Error creating file:", error);
  }
};


  if (error && !localStorage.getItem("token")) {navigate("/login")}
  else if(error){navigate("/reservations")}

  if (!reservations[0]) return <Loading/>;


  

  return (
    <div className="pageContainer">
        <PageHeader title={"Reservation details"}/>
      

        <div className="bookingProductInfo" id='content-to-pdf'>
                <div className="headerProductInfo variantReservationDet">
                    <section className='imgAndInfo'>
                        <div className="containerImg">
                        <img src={reservations[0].experience.images[0]} alt="" />
                        </div>
                        <div className="ProductInfoTitle ">
                          <section>
                              <h3>{reservations[0].experience.title}</h3>

                            <div className='locationDuration'>
                              <div className="productLocation">
                              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732"/></svg>
                              <p>{reservations[0].experience.country}, {reservations[0].experience.ubication}</p>
                      
                              </div>
                              <div className="productDuration">
                                  <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-4a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4z" clipRule="evenodd"/></svg>
                                  <p>{reservations[0].experience.quantity} {reservations[0].experience.timeUnit.toLowerCase()}</p>

                                  </div>  
                              </div>
                            </div>

                            <div className='checkInOutContainer'>
                                <div className='checkContainer'>
                                  <div>
                                    <RiLoginCircleFill className="icon"/>
                                    <p className="check_p">Check-In </p>
                                  </div>
                                  <p>{formatDateTime(reservations[0].checkIn)}</p>
                                </div>

                                <div className='checkContainer'>
                                  <div>
                                    <RiLogoutCircleFill className="icon"/>
                                    <p className="check_p">Check-Out </p>
                                  </div>
                                  <p>{formatDateTime(reservations[0].checkOut)}</p>
                                </div>
                                          
                            </div>

                          </section>

                        </div>
                    </section>
                    
                    <section className='ownerAndButon'>
                          <div>
                            <h4>Reservation owner</h4>
                            <p>{reservations[0].user.name} {reservations[0].user.lastName}</p>
                            <p>{reservations[0].user.email}</p>  
                          </div>  
                          <button onClick={generatePDF} className={`buttonMoreAction exclude-from-pdf`}>
                            <FaFileDownload />
                            Download
                          </button> 
                      </section>
                </div>


                <div className="productDescription">
                  <h4>What will you do?</h4>  
                  <p>{reservations[0].experience.description}</p>
                </div>

                <div className="productProperties">
                    <h4>Properties</h4>
                    <div className="containerProperties">
                        {reservations[0].experience.properties.map((property, index)=>(
                            <div key={index}>
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
  )
}

export default ReservationDetails;
