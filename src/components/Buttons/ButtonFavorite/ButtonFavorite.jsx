import React, { useState } from 'react';
import style from './buttonFavorite.module.scss';
import defaultFavorite from '../../../../public/default_favorite.svg';
import selectedFavorite from '../../../../public/selectedFavorite.svg';
import { useFavorites } from '../../../context/Contex';
import  useAuthLogin  from '../../../hooks/useAuthLogin'; // Asegúrate de importar el hook

const ButtonFavorite = ({ experienceId }) => {
  const { favorites, handleToggleFavorite } = useFavorites();
  const { username, checkToken } = useAuthLogin(); // Obtén el username y checkToken desde el hook

  const isFavorite = favorites.includes(experienceId);
  const [isChecked, setIsChecked] = useState(isFavorite);

  // Maneja el clic en el botón
  const handleClick = () => {
    checkToken();  // Verificar el token al hacer clic

    // Si el username es nulo, significa que no está autenticado
    if (!username) {
      console.warn("Usuario no autenticado. No se puede agregar a favoritos.");
      return;  // Si no está autenticado, no continuar con la acción
    }

    // Si está autenticado, proceder con la acción de favoritos
    handleToggleFavorite(username, experienceId);  // Agregar a favoritos
    setIsChecked(!isChecked); // Cambiar el estado del botón (agregar/quitar favorito)
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
