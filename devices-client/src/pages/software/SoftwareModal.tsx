import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Software } from './types';

interface SoftwareModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (software: Software) => void;
  software?: Software;
}

const SoftwareModal: React.FC<SoftwareModalProps> = ({ open, onClose, onSave, software }) => {
  const [formData, setFormData] = useState<Software>({ 
    id: 0, 
    nome: '', 
    dataUltimaAtualizacao: null, 
    ip: '', 
    porta: undefined, 
    url: '' 
  });

  const updateUrl = (data: Software) => {
    if (data.porta) {
      setFormData({ ...data, url: `https://${data.ip}:${data.porta}` });
    } else {
      setFormData({ ...data, url: `https://${data.ip}` });
    }
  };

  useEffect(() => {
    if (software) {
      setFormData(software);
    } else {
      setFormData({ 
        id: 0, 
        nome: '', 
        dataUltimaAtualizacao: null, 
        ip: '', 
        porta: undefined, 
        url: '' 
      });
    }
  }, [software]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'ip' || name === 'porta') {
      updateUrl({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    updateUrl(formData); // Ensure URL is updated before saving
    const updatedSoftware = {
      ...formData,
      dataUltimaAtualizacao: formData.dataUltimaAtualizacao ? new Date(formData.dataUltimaAtualizacao).toISOString() : null,
    };
    onSave(updatedSoftware);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '50%' }}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Data Última Atualização"
          name="dataUltimaAtualizacao"
          type="date"
          value={formData.dataUltimaAtualizacao ? formData.dataUltimaAtualizacao.split('T')[0] : ''}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="IP"
          name="ip"
          value={formData.ip}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Porta"
          name="porta"
          type="number"
          value={formData.porta || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default SoftwareModal;
