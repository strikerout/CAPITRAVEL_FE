import React, { createContext, useContext, useState, useEffect } from "react";
import { toggleFavorite, getFavorites } from "../api/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteExperienceIds, setFavoriteExperienceIds] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("userFavoriteExperienceList") || "[]"
    );
    setFavoriteExperienceIds(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userFavoriteExperienceList",
      JSON.stringify(favoriteExperienceIds)
    );

    const fetchFavorites = async () => {
      if (favoriteExperienceIds.length > 0) {
        const data = await getFavorites(favoriteExperienceIds);
        setFavoritesData(data);
      } else {
        setFavoritesData([]);
      }
    };
    fetchFavorites();
  }, [favoriteExperienceIds]);

  const handleToggleFavorite = async (email, experienceId) => {
    const result = await toggleFavorite(email, experienceId);
    if (result.success) {
      setFavoriteExperienceIds((prev) =>
        prev.includes(experienceId)
          ? prev.filter((id) => id !== experienceId)
          : [...prev, experienceId]
      );
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteExperienceIds, favoritesData, handleToggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
