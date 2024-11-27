import React, { createContext, useContext} from "react";
import { toggleFavorite, } from "../api/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

  const handleToggleFavorite = async (email, experienceId) => {
    const result = await toggleFavorite(email, experienceId);
    if (result.success) {
      console.log("Favorite toggled successfully");
    } else {
      console.error("Error toggling favorite:", result.error);
    }
  };


  return (
    <FavoritesContext.Provider value={{handleToggleFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
