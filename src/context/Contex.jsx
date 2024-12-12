import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toggleFavorite, getFavorites } from "../api/favorites";
import { getUserByEmail } from "../api/users";
import useAuthLogin from "../hooks/useAuthLogin";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteExperienceIds, setFavoriteExperienceIds] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const { username } = useAuthLogin();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("userFavoriteExperienceList"));
    if (storedFavorites) {
      setFavoriteExperienceIds(storedFavorites);
      fetchFavorites(storedFavorites);
    } else {
      fetchData();
    }
  }, [username]);

  const fetchData = async () => {
    if (!localStorage.getItem("token") || !username) {
      return;
    }
    try {
      const storedFavorites = await getUserByEmail(username);
      const ids = storedFavorites.data.favoriteExperienceIds || [];
      setFavoriteExperienceIds(ids);
      fetchFavorites(ids);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const fetchFavorites = useCallback(async (experienceIds = favoriteExperienceIds) => {
    if (!experienceIds || experienceIds.length === 0) {
      if (username) {
        const storedFavorites = await getUserByEmail(username);
        experienceIds = storedFavorites.data.favoriteExperienceIds
        setFavoriteExperienceIds(experienceIds);
      }
    };

    if (!experienceIds || experienceIds.length === 0) {
      setFavoritesData([]);
      return;
    }
    const data = await getFavorites(experienceIds);
    setFavoritesData(data);
  }, [username]);

  useEffect(() => {
    if (favoriteExperienceIds.length > 0) {
      localStorage.setItem("userFavoriteExperienceList", JSON.stringify(favoriteExperienceIds));
    }
  }, [favoriteExperienceIds]);

  const handleToggleFavorite = async (email, experienceId) => {
    const result = await toggleFavorite(email, experienceId); 

    if (result.success) {
      setFavoriteExperienceIds((prev) => {
        const updatedFavorites = prev.includes(experienceId)
          ? prev.filter((id) => id !== experienceId)
          : [...prev, experienceId];

        localStorage.setItem("userFavoriteExperienceList", JSON.stringify(updatedFavorites));

        fetchFavorites(updatedFavorites)

        return updatedFavorites;
      });
    }
  };


  return (
    <FavoritesContext.Provider value={{ favoriteExperienceIds, favoritesData, handleToggleFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
