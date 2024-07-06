import { Brand } from './types';
import { api } from '../../apiContants';

// Funções para Marcas
export const fetchBrands = async () => {
  const response = await api.get('/Marcas');
  return response.data;
};

export const createBrand = async (brand: Brand) => {
  const response = await api.post('/Marcas', brand);
  return response.data;
};

export const updateBrand = async (brand: Brand) => {
  const response = await api.put(`/Marcas/${brand.id}`, brand);
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/Marcas/${id}`);
  return response.data;
};
