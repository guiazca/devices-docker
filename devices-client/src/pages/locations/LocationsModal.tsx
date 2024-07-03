import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Location } from './types';

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (location: Location) => void;
  location?: Location;
}

const LocationModal: React.FC<LocationModalProps> = ({ open, onClose, onSave, location }) => {
  const [formData, setFormData] = useState<Location>({ nome: '' });

  useEffect(() => {
    if (location) {
      setFormData(location);
    } else {
      setFormData({ nome: '' });
    }
  }, [location]);

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

export default LocationModal;
