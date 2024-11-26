import React, { useState, useEffect } from 'react';
import style from './buttonFavorite.module.scss';
import defaultFavorite from '../../../../public/default_favorite.svg';
import selectedFavorite from '../../../../public/selectedFavorite.svg';
import { useFavorites } from '../../../context/Contex';
import useAuthLogin from '../../../hooks/useAuthLogin';

const ButtonFavorite = ({ experienceId }) => {
  const { favorites, handleToggleFavorite } = useFavorites(); // Asegúrate de que esto esté recibiendo y modificando el estado correctamente
  const { username } = useAuthLogin();
  const isFavorite = favorites.includes(experienceId);
  const [isChecked, setIsChecked] = useState(isFavorite);

  useEffect(() => {
    console.log('Favorites cargados:', favorites); // Verifica qué contiene favorites en cada renderizado
  }, [favorites]);

  const handleClick = () => {
    if (!username) {
      console.warn("Usuario no autenticado. No se puede agregar a favoritos.");
      return;
    }

    console.log(`Toggling favorite para la experiencia con ID: ${experienceId}`);
    handleToggleFavorite(username, experienceId); // Asegúrate de que esto actualiza el estado global
    setIsChecked(!isChecked);
  };

  return (
    <div className={style.buttonFavorite} onClick={handleClick}>
      <img
        src={isChecked ? selectedFavorite : defaultFavorite}
        alt="Guardar en favoritos"
      />
    </div>
  );
};

export default ButtonFavorite;
