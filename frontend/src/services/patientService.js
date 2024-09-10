import axios from 'axios';

const API_URL = 'http://localhost:3000/patients'; // Your API base URL

export const getAllPatients = async () => {
  return axios.get(`${API_URL}/list`);
};

export const getPatientById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createPatient = async (patientData) => {
  return axios.post(API_URL, patientData);
};

export const updatePatient = async (id, patientData) => {
  return axios.put(`${API_URL}/${id}`, patientData);
};

export const deletePatient = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
