import { useState } from "react";
import {
  getReservations,
  getReservationById,
  getReservationsByUser,
  getReservationDatesByExperience,
  createReservation,
  deleteReservation,
} from "../api/reservations";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      setError(err.response || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReservationById = async (id) => {
    setLoading(true);
    try {
      const data = await getReservationById(id);
      setReservations([data]);
    } catch (err) {
      setError(err.response || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReservationsByUser = async (email) => {
    if (!email) return; 
    setLoading(true);
    try {
      const data = await getReservationsByUser(email);
      setReservations(data);
    } catch (err) {
      setError(err.response || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReservationDatesByExperience = async (experienceId) => {
    setLoading(true);
    try {
      const data = await getReservationDatesByExperience(experienceId);
      setReservations(data);
      return data;
    } catch (err) {
      setError(err.response || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const createNewReservation = async (reservationData) => {
    setLoading(true);
    try {
      const data = await createReservation(reservationData);
      return data;
    } catch (err) {
      setError(err.response || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeReservation = async (id) => {
    setLoading(true);
    try {
      await deleteReservation(id);

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id)
      );

      return null;
    } catch (err) {
      const error = err.response || "Unknown error";
      setError(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    reservations,
    loading,
    error,
    fetchReservations,
    fetchReservationById,
    fetchReservationsByUser,
    fetchReservationDatesByExperience,
    createNewReservation,
    removeReservation,
  };
};

export default useReservations;
