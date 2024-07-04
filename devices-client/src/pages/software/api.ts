import { Software } from './types';
import { api } from '../../apiContants';

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