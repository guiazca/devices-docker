import { Model } from './types';
import { api } from '../../apiContants';


// Funções para Modelos
export const fetchModels = async () => {
  const response = await api.get('/Modelos');
  return response.data;
};

export const createModel = async (model: Model) => {
  const response = await api.post('/Modelos', model);
  return response.data;
};

export const updateModel = async (model: Model) => {
  const response = await api.put(`/Modelos/${model.id}`, model);
  return response.data;
};

export const deleteModel = async (id: number) => {
  const response = await api.delete(`/Modelos/${id}`);
  return response.data;
};

// Funções para Marcas (para buscar marcas associadas aos modelos)
export const fetchBrands = async () => {
  const response = await api.get('/Marcas');
  return response.data;
};
