import React, { useState } from "react";
import style from "./daysSelector.module.scss";

const DaysOfService = ({ fun }) => {
  // Mapeo de los días abreviados a los nombres completos
  const daysOfWeek = [
    { short: "Mon", full: "MONDAY" },
    { short: "Tue", full: "TUESDAY" },
    { short: "Wed", full: "WEDNESDAY" },
    { short: "Thu", full: "THURSDAY" },
    { short: "Fri", full: "FRIDAY" },
    { short: "Sat", full: "SATURDAY" },
    { short: "Sun", full: "SUNDAY" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  // Manejar la selección/deselección de días
  const handleDayClick = (e, day) => {
    e.preventDefault();

    // Actualizar el estado local para gestionar la visualización
    setSelectedDays((prevState) =>
      prevState.includes(day.full)
        ? prevState.filter((d) => d !== day.full) // Deseleccionar
        : [...prevState, day.full] // Seleccionar
    );

    // Llamar a la función pasada como prop para actualizar el estado en el componente padre
    fun(day.full);
  };

  return (
    <div className={style.daysContainer}>
      <h3>What Days Will You Offer Service?</h3>
      <div className={style.daysButtons}>
        {daysOfWeek.map((day) => (
          <button
            key={day.short}
            className={`${style.dayButton} ${
              selectedDays.includes(day.full) ? style.selected : ""
            }`}
            onClick={(e) => handleDayClick(e, day)}
          >
            {day.short}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfService;
