import { useState } from 'react';
import {
  getReservations,
  getReservationById,
  getReservationsByUser,
  getReservationDatesByExperience,
  createReservation,
  deleteReservation,
} from '../api/reservations';

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las reservas
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      setError(err.response || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Obtener reserva por ID
  const fetchReservationById = async (id) => {
    setLoading(true);
    try {
      const data = await getReservationById(id);
      setReservations([data]); // Ponemos la reserva en un array para consistencia
    } catch (err) {
      setError(err.response || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Obtener reservas por usuario
  const fetchReservationsByUser = async (email) => {
    setLoading(true);
    try {
      const data = await getReservationsByUser(email);
      setReservations(data);
    } catch (err) {
      setError(err.response || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Obtener fechas reservadas por experiencia
  const fetchReservationDatesByExperience = async (experienceId) => {
    setLoading(true);
    try {
      const data = await getReservationDatesByExperience(experienceId);
      setReservations(data);
      return data;
    } catch (err) {
      setError(err.response || 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva reserva
  const createNewReservation = async (reservationData) => {
    setLoading(true);
    try {
      const data = await createReservation(reservationData);
      return data;
    } catch (err) {
      setError(err.response || 'Unknown error');
      throw err; // Devolvemos el error si es necesario
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una reserva por ID
  const removeReservation = async (id) => {
    setLoading(true);
    try {
      await deleteReservation(id);
    } catch (err) {
      setError(err.response || 'Unknown error');
      throw err;
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