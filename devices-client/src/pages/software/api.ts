import axios from 'axios';
import { Software } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7131/api', // Atualize a URL base para o seu backend
});

// Funções para Softwares
export const fetchSoftwares = async () => {
  const response = await api.get('/Softwares');
  return response.data;
};

export const createSoftware = async (software: Software) => {
  const response = await api.post('/Softwares', software);
  return response.data;
};

export const updateSoftware = async (software: Software) => {
  await api.put(`/Softwares/${software.id}`, software);
};

export const deleteSoftware = async (id: number) => {
  await api.delete(`/Softwares/${id}`);
};