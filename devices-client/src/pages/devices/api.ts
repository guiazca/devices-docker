import { Device } from './types';
import { api } from '../../apiContants';


// Funções para Modelos
export const fetchModelsByBrand = async (brandId: number) => {
  const response = await api.get(`/modelos/${brandId}/modelos`);
  return response.data;
};

// Funções para Dispositivos
export const fetchDevices = async (page: number, pageSize: number, marcaId?: number, localizacaoId?: number, categoriaId?: number) => {
  const response = await api.get('/dispositivos', {
    params: { page, pageSize, marcaId, localizacaoId, categoriaId }
  });
  return response.data;
};
export const createDevice = async (device: Device) => {
  const response = await api.post('/dispositivos', device);
  return response.data;
};

export const updateDevice = async (device: Device) => {
  const response = await api.put(`/dispositivos/${device.id}`, device);
  return response.data;
};

export const deleteDevice = async (id: number) => {
  const response = await api.delete(`/dispositivos/${id}`);
  return response.data;
};