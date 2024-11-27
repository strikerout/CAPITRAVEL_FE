import React, { useState, useEffect } from 'react';
import style from './buttonFavorite.module.scss';
import defaultFavorite from '../../../../public/default_favorite.svg';
import selectedFavorite from '../../../../public/selectedFavorite.svg';
import { useFavorites } from '../../../context/Contex';
import useAuthLogin from '../../../hooks/useAuthLogin';
import { useNavigate } from 'react-router-dom';

const ButtonFavorite = ({ experienceId }) => {
  const { handleToggleFavorite } = useFavorites();
  const { username } = useAuthLogin();
  const navigate = useNavigate();

  const savedFavorites = localStorage.getItem('userFavoriteExperienceList');
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  const isFavorite = initialFavorites.includes(experienceId);

  const [isChecked, setIsChecked] = useState(isFavorite);

  useEffect(() => {
    setIsChecked(initialFavorites.includes(experienceId));
  }, [experienceId, initialFavorites]);

  const handleClick = () => {
    if (!username) {
      console.warn("User is not logged in. Cannot toggle favorite.");
      navigate('/login');
      return;
    }

    console.log(`Toggling favorite para la experiencia con ID: ${experienceId}`);
    handleToggleFavorite(username, experienceId);
    
    const updatedFavorites = isChecked
      ? initialFavorites.filter(id => id !== experienceId)
      : [...initialFavorites, experienceId];

    localStorage.setItem('userFavoriteExperienceList', JSON.stringify(updatedFavorites));
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
