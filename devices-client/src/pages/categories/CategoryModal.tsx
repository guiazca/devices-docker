import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Category } from './types';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category?: Category;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, onSave, category }) => {
  const [formData, setFormData] = useState<Category>({ nome: '' });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({ nome: '' });
    }
  }, [category]);

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

export default CategoryModal;
