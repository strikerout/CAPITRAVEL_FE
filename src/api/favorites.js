import api from './api';

export const toggleFavorite = async (email, experienceId) => {
    try {
    const token = localStorage.getItem("token");
    console.log(token)

      const response = await api.post(
        `/users/favorites/${email}?experienceId=${experienceId}`,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        }
      );
      if (response.status === 204) {
        return { success: true }; // Acción exitosa
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return { success: false, error: error.message }; // Manejo del error
    }
  };

  export const fetchFavorites = async (email) => {
    try {
      const response = await fetch(`https://api.example.com/users/favorites/${email}`);
      if (response.status === 204) {
        console.log('No favorites found.');
      } else {
        const favorites = await response.json();
        console.log(favorites); // Procesar la lista de favoritos
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  

  