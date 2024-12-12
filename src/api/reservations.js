import api from "./api";

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

export const getReservationsByUser = async (email) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/reservations/user/${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getReservationDatesByExperience = async (experienceId) => {

  const response = await api.get(`/reservations/experience/${experienceId}`);
  return response.data;
};

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