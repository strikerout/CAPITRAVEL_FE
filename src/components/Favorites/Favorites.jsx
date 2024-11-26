// import React, { useEffect, useState } from 'react';
// import useAuthLogin from '../../hooks/useAuthLogin'; // Asegúrate de importar el hook
// import api from '../../api/api';  // Asegúrate de importar la instancia de axios

// const FavoriteExperiences = () => {
//   const [favorites, setFavorites] = useState([]);
//   const { username, checkToken } = useAuthLogin(); // Obtén el username del hook useAuthLogin

//   useEffect(() => {
//     if (!username) {
//       console.warn('Usuario no autenticado');
//       return;
//     }

//     console.log(username);

//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         console.log(token) // Recupera el token desde localStorage
//         const response = await api.get(`/users/favorites/${username}`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           }
//         });

//         if (response.status === 204) {
//           console.log('No content available');
//         } else {
//             console.log(response.data)
//           setFavorites(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     };

//     fetchFavorites();
//   }, [username]); // Se ejecuta cuando el username cambia

//   return (
//     <div>
//       <h1>Favorite Experiences</h1>
//       {favorites.length > 0 ? (
//         <ul>
//           {favorites.map((experience) => (
//             <li key={experience.id}>{experience.title}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No favorites found</p>
//       )}
//     </div>
//   );
// };

// export default FavoriteExperiences;
