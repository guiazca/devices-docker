import { Category } from './types';
import { api } from '../../apiContants';

// Funções para Categorias
export const fetchCategories = async () => {
  const response = await api.get('/categorias');
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await api.post('/categorias', category);
  return response.data;
};

export const updateCategory = async (category: Category) => {
  const response = await api.put(`/categorias/${category.id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};
