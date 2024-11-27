import api from "./api";

// Obtener todas las reservas
export const getReservations = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener reserva por ID
export const getReservationById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/reservations/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener reservas por usuario
export const getReservationsByUser = async (email) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/reservations/${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener fechas reservadas por experiencia
export const getReservationDatesByExperience = async (experienceId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/reservations/experience/${experienceId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Crear una nueva reserva
export const createReservation = async (reservationData) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/reservations", reservationData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Eliminar una reserva por ID
export const deleteReservation = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/reservations/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
