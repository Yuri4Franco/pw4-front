import axios from 'axios';
import { getAuthToken } from './authConfig.js';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 10000,
});

// Interceptores de requisição para adicionar o token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Obtem o token diretamente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
