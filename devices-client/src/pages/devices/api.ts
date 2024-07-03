import axios from 'axios';
import { Device } from './types';
import { api } from '../../apiContants';


// Funções para Modelos
export const fetchModelsByBrand = async (brandId: number) => {
  const response = await api.get(`/Modelos/${brandId}/modelos`);
  return response.data;
};

// Funções para Dispositivos
export const fetchDevices = async (page: number, pageSize: number, marcaId?: number, localizacaoId?: number, categoriaId?: number) => {
  const response = await api.get('/Dispositivos', {
    params: { page, pageSize, marcaId, localizacaoId, categoriaId }
  });
  return response.data;
};
export const createDevice = async (device: Device) => {
  const response = await api.post('/Dispositivos', device);
  return response.data;
};

export const updateDevice = async (device: Device) => {
  const response = await api.put(`/Dispositivos/${device.id}`, device);
  return response.data;
};

export const deleteDevice = async (id: number) => {
  const response = await api.delete(`/Dispositivos/${id}`);
  return response.data;
};