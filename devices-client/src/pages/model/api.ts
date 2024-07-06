import { Model } from './types';
import { api } from '../../apiContants';


// Funções para Modelos
export const fetchModels = async () => {
  const response = await api.get('/modelos');
  return response.data;
};

export const createModel = async (model: Model) => {
  const response = await api.post('/modelos', model);
  return response.data;
};

export const updateModel = async (model: Model) => {
  const response = await api.put(`/modelos/${model.id}`, model);
  return response.data;
};

export const deleteModel = async (id: number) => {
  const response = await api.delete(`/modelos/${id}`);
  return response.data;
};

// Funções para Marcas (para buscar marcas associadas aos modelos)
export const fetchBrands = async () => {
  const response = await api.get('/marcas');
  return response.data;
};
