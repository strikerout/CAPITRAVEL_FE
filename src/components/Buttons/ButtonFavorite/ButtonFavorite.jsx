import React, { useEffect } from "react";
import style from "./buttonFavorite.module.scss";
import defaultFavorite from "../../../../public/default_favorite.svg";
import selectedFavorite from "../../../../public/selectedFavorite.svg";
import { useFavorites } from "../../../context/Contex";
import useAuthLogin from "../../../hooks/useAuthLogin";
import { useNavigate } from "react-router-dom";

const ButtonFavorite = ({ experienceId }) => {
  let { handleToggleFavorite, favoriteExperienceIds, fetchFavorites } = useFavorites();
  const { username } = useAuthLogin();
  const navigate = useNavigate();

  const favoritesInLocalStorage = JSON.parse(localStorage.getItem("userFavoriteExperienceList"));
  if (favoritesInLocalStorage) {
    favoriteExperienceIds = favoritesInLocalStorage;
  }
  const isFavorite = favoriteExperienceIds.includes(experienceId);

  useEffect(() => {
    if (username) {
      fetchFavorites(favoriteExperienceIds);
    }
  }, [username, fetchFavorites]);

  const handleClick = () => {
    if (!username) {
      console.warn("User is not logged in. Cannot toggle favorite.");
      navigate("/login");
      return;
    }

    handleToggleFavorite(username, experienceId);
  };

  return (
    <div className={style.buttonFavorite} onClick={handleClick}>
      <img
        src={isFavorite ? selectedFavorite : defaultFavorite}
        alt="Guardar en favoritos"
      />
      <span className={style.tooltip}>
        {isFavorite ? "Remove" : "Add to favorites"}
      </span>
    </div>
  );
};

export default ButtonFavorite;
