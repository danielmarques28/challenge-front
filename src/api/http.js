import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token)
    config.headers['Authorization'] = `${token}`;

  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return Promise.reject(error);
});

export default http;
