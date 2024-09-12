import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const signup = async(data) => {
  return axios.post(`${API_URL}/signup`,data);
};
export const login = async(data) => {
  const response=await axios.post(`${API_URL}/login`,data);
  console.log("response:",response);
  if(response.status!=200){
    throw new Error('login failed');
  }
  console.log("hello")
  const info =response.data.token
  console.log(info);
  localStorage.setItem('jwt',info.token);
  console.log(localStorage);
};