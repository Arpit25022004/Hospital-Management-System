import axios from 'axios';

const API_URL = 'http://localhost:3000/appointments'; // Your API base URL

export const getAllAppointments = async () => {
  return axios.get(`${API_URL}/list`);
};

export const getAppointmentById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createAppointment = async (appointmentData) => {
  return axios.post(API_URL, appointmentData);
};

export const updateAppointment = async (id, appointmentData) => {
  return axios.put(`${API_URL}/${id}`, appointmentData);
};

export const deleteAppointment = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
