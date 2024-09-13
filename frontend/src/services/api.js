import axios from 'axios';
import { useRouter } from 'vue-router';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Your backend API URL
  timeout: 10000,
});

const router = useRouter();

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired
      localStorage.removeItem('jwt');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
