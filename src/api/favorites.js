import api from './api';

export const toggleFavorite = async (email, experienceId) => {
    try {
      const response = await api.post(
        `/users/favorites/${email}?experienceId=${experienceId}`
      );
      if (response.status === 204) {
        return { success: true }; // Acción exitosa
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return { success: false, error: error.message }; // Manejo del error
    }
  };