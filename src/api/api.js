import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_UR, 
  timeout: 20000,
});

export default api;
