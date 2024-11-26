import React, { createContext, useState, useContext } from "react";
import { toggleFavorite } from "../api/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = async (email, experienceId) => {
    const result = await toggleFavorite(email, experienceId);
    if (result.success) {
      setFavorites((prev) =>
        prev.includes(experienceId)
          ? prev.filter((id) => id !== experienceId) // Elimina si ya está
          : [...prev, experienceId] // Agrega si no está
      );
    } else {
      console.error("Error toggling favorite:", result.error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, handleToggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const 
useFavorites = () => useContext(FavoritesContext);
