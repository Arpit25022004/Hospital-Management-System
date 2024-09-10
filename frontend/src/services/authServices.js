import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

export const signup = (data) => api.post('/signup', data);
export const login = (username,password) => api.get(`${API_URL}/login/${username}/${password}`);