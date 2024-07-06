import { Software } from './types';
import { api } from '../../apiContants';

// Funções para Softwares
export const fetchSoftwares = async () => {
  const response = await api.get('/softwares');
  return response.data;
};

export const createSoftware = async (software: Software) => {
  const response = await api.post('/softwares', software);
  return response.data;
};

export const updateSoftware = async (software: Software) => {
  await api.put(`/softwares/${software.id}`, software);
};

export const deleteSoftware = async (id: number) => {
  await api.delete(`/softwares/${id}`);
};