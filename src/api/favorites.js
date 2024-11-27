import api from './api';

export const toggleFavorite = async (email, experienceId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)

    const response = await api.post(
      `/users/favorites/${email}?experienceId=${experienceId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true }; // Acción exitosa
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: error.message }; // Manejo del error
  }
};


