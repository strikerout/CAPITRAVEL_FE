import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 3000,
});

export default api;
