import api from './api'

const API_URL = 'http://localhost:3000/doctors'; // Your API base URL

export const getAllDoctors = async () => {
  return api.get(`${API_URL}/list`);
};

export const getDoctorById = async (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createDoctor = async (doctorData) => {
  return api.post(API_URL, doctorData);
};

export const updateDoctor = async (id, doctorData) => {
  return api.put(`${API_URL}/${id}`, doctorData);
};

export const deleteDoctor = async (id) => {
  return api.delete(`${API_URL}/${id}`);
};
