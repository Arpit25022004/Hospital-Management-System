import api from './api';

const API_URL = 'http://localhost:3000/appointments'; // Your API base URL

export const getAllAppointments = async () => {
  return api.get(`${API_URL}/list`);
};

export const getAppointmentById = async (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createAppointment = async (appointmentData) => {
  return api.post(API_URL, appointmentData);
};

export const updateAppointment = async (id, appointmentData) => {
  return api.put(`${API_URL}/${id}`, appointmentData);
};

export const deleteAppointment = async (id) => {
  return api.delete(`${API_URL}/${id}`);
};
