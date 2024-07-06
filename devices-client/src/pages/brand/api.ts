import { Brand } from './types';
import { api } from '../../apiContants';

// Funções para Marcas
export const fetchBrands = async () => {
  const response = await api.get('/marcas');
  return response.data;
};

export const createBrand = async (brand: Brand) => {
  const response = await api.post('/marcas', brand);
  return response.data;
};

export const updateBrand = async (brand: Brand) => {
  const response = await api.put(`/marcas/${brand.id}`, brand);
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/marcas/${id}`);
  return response.data;
};
