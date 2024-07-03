import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { Device, Brand, Model } from './types';
import { fetchModelsByBrand } from './api';
import { fetchLocations } from '../locations/api';
import { Location } from '../locations/types';
import { Category } from '../categories/types';
import { fetchBrands } from '../brand/api';
import { fetchCategories } from '../categories/api';

interface DeviceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  device?: Device;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ open, onClose, onSave, device }) => {
  const [formData, setFormData] = useState<Device>({ 
    modeloId: 0, 
    localizacaoId: 0, 
    categoriaId: 0, 
    marcaId: 0, 
    ip: '', 
    porta: undefined, 
    url: '' ,
    categoriaNome: '',
    nome: '',
    modeloNome: '',
    marcaNome: '',
    macAddress: '',
  });
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await fetchBrands();
      const locationsData = await fetchLocations();
      const categoriesData = await fetchCategories();
      setBrands(brandsData);
      setLocations(locationsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (device) {
      setFormData(device);
      if (device.marcaId) {
        fetchModelsByBrand(device.marcaId).then((modelsData) => {
          setModels(modelsData);
        });
      }
    } else {
      setFormData({ 
        modeloId: 0, 
        localizacaoId: 0, 
        categoriaId: 0, 
        marcaId: 0, 
        ip: '', 
        porta: undefined, 
        url: '' ,
        categoriaNome: '',
        nome: '',
        modeloNome: '',
        marcaNome: '',
        macAddress: '',
      });
    }
  }, [device]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBrandChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setFormData({ ...formData, marcaId: brandId, modeloId: 0 });
    const modelsData = await fetchModelsByBrand(brandId);
    setModels(modelsData);
  };

  const handleSave = () => {
    if (!formData.url) {
      if (formData.porta) {
        formData.url = `https://${formData.ip}:${formData.porta}`;
      } else {
        formData.url = `https://${formData.ip}`;
      }
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white',margin: 'auto' ,marginTop: '5%', width: '50%' }}>
      <TextField fullWidth label="descricao" name="descricao" value={formData.descricao} onChange={handleChange} margin="normal" />
        <TextField
          select
          fullWidth
          label="Marca"
          name="marcaId"
          value={formData.marcaId}
          onChange={handleBrandChange}
          margin="normal"
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Modelo"
          name="modeloId"
          value={formData.modeloId}
          onChange={handleChange}
          margin="normal"
          disabled={!formData.marcaId}
        >
          {models.map((model) => (
            <MenuItem key={model.id} value={model.id}>
              {model.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Localização"
          name="localizacaoId"
          value={formData.localizacaoId}
          onChange={handleChange}
          margin="normal"
        >
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Categoria"
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField fullWidth label="macAdress" name="macAddress" value={formData.macAddress} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="IP" name="ip" value={formData.ip} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Porta" name="porta" value={formData.porta || ''} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="URL" name="url" value={formData.url} onChange={handleChange} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>Salvar</Button>
      </Box>
    </Modal>
  );
};

export default DeviceModal;
