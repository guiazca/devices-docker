import { Category } from './types';
import { api } from '../../apiContants';

// Funções para Categorias
export const fetchCategories = async () => {
  const response = await api.get('/Categorias');
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await api.post('/Categorias', category);
  return response.data;
};

export const updateCategory = async (category: Category) => {
  const response = await api.put(`/Categorias/${category.id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/Categorias/${id}`);
  return response.data;
};
