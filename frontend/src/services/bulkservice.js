import api from './api';
const API_URL = 'http://localhost:3000';

export async function bulkUpload(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}