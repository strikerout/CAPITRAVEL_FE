import React, { useState } from "react";
import style from "./experienceDates.module.scss";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExperienceDates = ({ data, onDateTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null); // Estado para la fecha seleccionada

  const availableDays = data.availableDays.map((day) => day.toUpperCase());
  const serviceHours = data.serviceHours.split("-");
  const today = new Date(); // Fecha actual

  const mapDayToNumber = (day) => {
    const daysMap = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };
    return daysMap[day] || -1;
  };

  const allowedDays = new Set(availableDays.map(mapDayToNumber));
  const filterDays = (date) => allowedDays.has(date.getDay());

  const handleDateChange = (date) => {
    setSelectedDate(date); // Actualizar el estado con la fecha seleccionada
    const formattedDate = date.toISOString(); // Formato ISO
    if (onDateTimeSelect) {
      onDateTimeSelect(formattedDate); // Enviar al padre
    }
  };

  return (
    <>
      <div className={style.policyContainer}>
        <h3>Add dates to book</h3>
        <h5>Choose the start time of your experience</h5>
        <div>
          <label>Available Time:</label>
          <p>{data.serviceHours}</p>
        </div>
        <Calendar
          monthsShown={2}
          selected={selectedDate} // Vincula el estado con el valor seleccionado
          onChange={handleDateChange} // Maneja el cambio de fecha
          filterDate={filterDays} // Filtrar días disponibles
          minDate={today} // Deshabilitar días anteriores a hoy
          showTimeSelect // Activar selector de hora
          timeIntervals={60} // Intervalos de tiempo en minutos
          minTime={new Date(`1970-01-01T${serviceHours[0]}:00`)} // Hora mínima
          maxTime={new Date(`1970-01-01T${serviceHours[1]}:00`)} // Hora máxima
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a weekday"
        /> 
        {selectedDate && (
          <p>
            <strong>Selected Date & Time:</strong>{" "}
            {selectedDate.toLocaleString()}
          </p>
        )}
      </div>
    </>
  );
};

export default ExperienceDates;
