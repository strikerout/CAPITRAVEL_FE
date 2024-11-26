import React, { useState, useEffect } from 'react';
import style from './buttonFavorite.module.scss';
import defaultFavorite from '../../../../public/default_favorite.svg';
import selectedFavorite from '../../../../public/selectedFavorite.svg';
import { useFavorites } from '../../../context/Contex';
import  useAuthLogin  from '../../../hooks/useAuthLogin';

const ButtonFavorite = ({ experienceId }) => {
  const { favorites, handleToggleFavorite } = useFavorites();
  const { username, checkToken } = useAuthLogin();
  const isFavorite = favorites.includes(experienceId);
  const [isChecked, setIsChecked] = useState(isFavorite);

  // Ejecuta checkToken al montar el componente
  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleClick = () => {
    // Verifica si el usuario está autenticado antes de proceder
    if (!username) {
      console.warn("Usuario no autenticado. No se puede agregar a favoritos.");
      return;
    }
    
    handleToggleFavorite(username, experienceId);
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
