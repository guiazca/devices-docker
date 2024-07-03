import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Brand } from './types';

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (brand: Brand) => void;
  brand?: Brand;
}

const BrandModal: React.FC<BrandModalProps> = ({ open, onClose, onSave, brand }) => {
  const [formData, setFormData] = useState<Brand>({ nome: '' });

  useEffect(() => {
    if (brand) {
      setFormData(brand);
    } else {
      setFormData({ nome: '' });
    }
  }, [brand]);

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
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>Salvar</Button>
      </Box>
    </Modal>
  );
};

export default BrandModal;
