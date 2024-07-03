import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { Model } from './types';
import { Brand } from '../brand/types';

interface ModelModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (model: Model) => void;
  model?: Model;
  brands: Brand[];
}

const ModelModal: React.FC<ModelModalProps> = ({ open, onClose, onSave, model, brands }) => {
  const [formData, setFormData] = useState<Model>({ nome: '', marcaId: 0 });

  useEffect(() => {
    if (model) {
      setFormData(model);
    } else {
      setFormData({ nome: '', marcaId: 0 });
    }
  }, [model]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '50%' }}>
        <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} margin="normal" />
        <TextField
          select
          fullWidth
          label="Marca"
          name="marcaId"
          value={formData.marcaId}
          onChange={handleChange}
          margin="normal"
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.nome}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>Salvar</Button>
      </Box>
    </Modal>
  );
};

export default ModelModal;
