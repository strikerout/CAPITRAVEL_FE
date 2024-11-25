import React, { useState } from "react";

const TimeRangeSelector = ({ onChange }) => {
  // Generar las horas en formato militar
  const generateMilitaryHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  };

  const militaryHours = generateMilitaryHours();

  // Estado para las horas seleccionadas
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Función para enviar los valores de las horas al componente padre
  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;
    setStartTime(selectedStartTime);
    onChange(selectedStartTime, endTime);  // Pasamos los valores actualizados al componente padre
  };

  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;
    setEndTime(selectedEndTime);
    onChange(startTime, selectedEndTime);  // Pasamos los valores actualizados al componente padre
  };

  // Obtener el formato "HH:mm-HH:mm"
  const getFormattedRange = () => {
    if (!startTime || !endTime) return "";
    
    // Asegurarse de que ambas horas están formateadas correctamente
    const startFormatted = startTime;  // Ya está en el formato adecuado
    const endFormatted = endTime;      // Ya está en el formato adecuado
    
    return `${startFormatted}-${endFormatted}`;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#6b4226" }}>
      <h2>Choose A Service Time</h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div>
          <label htmlFor="start-time">Start Time</label>
          <select
            id="start-time"
            value={startTime}
            onChange={handleStartTimeChange}
            style={{
              padding: "0.5rem",
              border: "1px solid #6b4226",
              borderRadius: "5px",
              marginTop: "0.5rem",
            }}
          >
            <option value="">--:--</option>
            {militaryHours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="end-time">End Time</label>
          <select
            id="end-time"
            value={endTime}
            onChange={handleEndTimeChange}
            style={{
              padding: "0.5rem",
              border: "1px solid #6b4226",
              borderRadius: "5px",
              marginTop: "0.5rem",
            }}
          >
            <option value="">--:--</option>
            {militaryHours.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mostrar el rango formateado */}
      {startTime && endTime && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          Selected Range: {getFormattedRange()}
        </p>
      )}
    </div>
  );
};

export default TimeRangeSelector;
