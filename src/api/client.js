import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getAuthToken = () => localStorage.getItem('token');

const authInterceptor = (config) => {
  config.headers['Authorization'] = getAuthToken();
  return config;
}

client.interceptors.request.use(authInterceptor);

export default client;
