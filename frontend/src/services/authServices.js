import api from './api';

const API_URL = 'http://localhost:3000';

export const signup = async(data) => {
  return api.post(`${API_URL}/signup`,data);
};
export const login = async(data) => {
  const response=await api.post(`${API_URL}/login`,data);
  if(response.status!=200){
    throw new Error('login failed');
  }
  const info =response.data.token
  localStorage.setItem('jwt',info);
  return response;
};