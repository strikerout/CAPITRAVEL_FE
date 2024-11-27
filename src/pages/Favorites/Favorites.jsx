import React, { useEffect, useState } from "react";
import { getFavorites } from "../../api/favorites";
import ProductCard from "../../components/Cards/ProductCard";
import style from "./favorites.module.scss";
import capiFavorite from "../../../public/capi_favorite.svg";
import { useNavigate } from "react-router-dom";

const Favorites = () => {

  function indexElements(index) {
    return (index % 10) + 1;
  }
  const navigate = useNavigate();
  const [favoritesData, setFavoritesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      console.log(localStorage.getItem("userFavoriteExperienceList"));
      const userFavoriteExperienceList = localStorage.getItem(
        "userFavoriteExperienceList"
      );

      if (userFavoriteExperienceList) {
        try {
          const favoriteIds = JSON.parse(userFavoriteExperienceList); 
          const data = await getFavorites(favoriteIds); 
          setFavoritesData(data);
        } catch (err) {
          setError(err.message); 
        }
      }
    };

    fetchFavoritesData(); 
  }, []);

  return (
    <section className={style.containerPage}>
      <div className={style.titleSection}>
        <div className="formNavigate orange" onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m14 7l-5 5l5 5"
            />
          </svg>
          <h4>Back to home</h4>
        </div>
        <div className={style.containerText}>
          <img src={capiFavorite} alt="Favorite Icon" />
          <div>
            <h2>
              {favoritesData && favoritesData.length > 0
                ? "Saved experiences"
                : "Add experiences to your favorites"}
            </h2>
            <p>
              {favoritesData && favoritesData.length > 0
                ? "What great choices!"
                : "There’s nothing saved yet."}
            </p>
          </div>
        </div>
      </div>

      {error && <p>Error: {error}</p>}
      {!error && !favoritesData && <p>Cargando favoritos...</p>}
      {favoritesData && favoritesData.length > 0 && (
        <div className="desktopCars">
          <div className="grid-container">
            {favoritesData.map((favorite, index) => (
              <div key={favorite.id}  className={`item item-${indexElements(index)}`}>
            <ProductCard key={favorite.id} data={favorite} />
            </div>
          ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;
