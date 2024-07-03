import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7131/api', // Atualize a URL base para o seu back-end
});

export const fetchDevices = async () => {
  const response = await api.get('/Dispositivos');
  return response.data;
};

export const createDevice = async (device: any) => {
  const response = await api.post('/Dispositivos', device);
  return response.data;
};

export const updateDevice = async (id: number, device: any) => {
  const response = await api.put(`/Dispositivos/${id}`, device);
  return response.data;
};

export const deleteDevice = async (id: number) => {
  const response = await api.delete(`/Dispositivos/${id}`);
  return response.data;
};

// Funções para Localizações
export const fetchLocations = async () => {
  const response = await api.get('/localizacoes');
  return response.data;
};

export const createLocation = async (location: any) => {
  const response = await api.post('/localizacoes', location);
  return response.data;
};

export const updateLocation = async (id: number, location: any) => {
  const response = await api.put(`/localizacoes/${id}`, location);
  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await api.delete(`/localizacoes/${id}`);
  return response.data;
};

// Funções para Categorias
export const fetchCategories = async () => {
  const response = await api.get('/categorias');
  return response.data;
};

export const createCategory = async (category: any) => {
  const response = await api.post('/categorias', category);
  return response.data;
};

export const updateCategory = async (id: number, category: any) => {
  const response = await api.put(`/categorias/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};

// Funções para Marcas
export const fetchBrands = async () => {
  const response = await api.get('/marcas');
  return response.data;
};

export const createBrand = async (brand: any) => {
  const response = await api.post('/marcas', brand);
  return response.data;
};

export const updateBrand = async (id: number, brand: any) => {
  const response = await api.put(`/marcas/${id}`, brand);
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/marcas/${id}`);
  return response.data;
};

// Funções para Modelos
export const fetchModels = async () => {
  const response = await api.get('/modelos');
  return response.data;
};

export const createModel = async (model: any) => {
  const response = await api.post('/modelos', model);
  return response.data;
};

export const updateModel = async (id: number, model: any) => {
  const response = await api.put(`/modelos/${id}`, model);
  return response.data;
};

export const deleteModel = async (id: number) => {
  const response = await api.delete(`/modelos/${id}`);
  return response.data;
};

// Funções para Softwares
export const fetchSoftwares = async () => {
  const response = await api.get('/softwares');
  return response.data;
};

export const createSoftware = async (software: any) => {
  const response = await api.post('/softwares', software);
  return response.data;
};

export const updateSoftware = async (id: number, software: any) => {
  const response = await api.put(`/softwares/${id}`, software);
  return response.data;
};

export const deleteSoftware = async (id: number) => {
  const response = await api.delete(`/softwares/${id}`);
  return response.data;
};
