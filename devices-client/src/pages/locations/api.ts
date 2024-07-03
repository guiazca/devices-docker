import axios from 'axios';
import { Location } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7131/api', // Atualize a URL base para o seu backend
});

// Funções para Localizações
export const fetchLocations = async () => {
  const response = await api.get('/localizacoes');
  return response.data;
};

export const createLocation = async (location: Location) => {
  const response = await api.post('/localizacoes', location);
  return response.data;
};

export const updateLocation = async (location: Location) => {
  const response = await api.put(`/localizacoes/${location.id}`, location);
  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await api.delete(`/localizacoes/${id}`);
  return response.data;
};
