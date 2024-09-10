import axios from 'axios';

const API_URL = 'http://localhost:3000/doctors'; // Your API base URL

export const getAllDoctors = async () => {
  return axios.get(`${API_URL}/list`);
};

export const getDoctorById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createDoctor = async (doctorData) => {
  return axios.post(API_URL, doctorData);
};

export const updateDoctor = async (id, doctorData) => {
  return axios.put(`${API_URL}/${id}`, doctorData);
};

export const deleteDoctor = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
