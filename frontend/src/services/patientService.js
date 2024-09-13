import api from './api';

const API_URL = 'http://localhost:3000/patients'; // Your API base URL

export const getAllPatients = async () => {
  return api.get(`${API_URL}/list`);
};

export const getPatientById = async (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createPatient = async (patientData) => {
  return api.post(API_URL, patientData);
};

export const updatePatient = async (id, patientData) => {
  return api.put(`${API_URL}/${id}`, patientData);
};

export const deletePatient = async (id) => {
  return api.delete(`${API_URL}/${id}`);
};
