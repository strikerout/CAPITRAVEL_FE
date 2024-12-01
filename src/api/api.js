import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  timeout: 20000,
});

export default api;

api.get('/experiences')
  .then(response => {
    console.log('Respuesta de la API:', response.data);  // Verifica los datos
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
