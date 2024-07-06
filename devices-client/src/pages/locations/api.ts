import { Location } from './types';
import { api } from '../../apiContants';

// Funções para Localizações
export const fetchLocations = async () => {
  const response = await api.get('/Localizacoes');
  return response.data;
};

export const createLocation = async (location: Location) => {
  const response = await api.post('/Localizacoes', location);
  return response.data;
};

export const updateLocation = async (location: Location) => {
  const response = await api.put(`/Localizacoes/${location.id}`, location);
  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await api.delete(`/Localizacoes/${id}`);
  return response.data;
};
