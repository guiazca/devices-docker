import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import SoftwareTable from './SoftwareTable';
import SoftwareModal from './SoftwareModal';
import { fetchSoftwares, createSoftware, updateSoftware, deleteSoftware } from './api';
import { Software } from './types';

const SoftwarePage: React.FC = () => {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | undefined>(undefined);

  const fetchData = async () => {
    const data = await fetchSoftwares();
    setSoftwares(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingSoftware(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveSoftware = async (software: Software) => {
    if (software.id) {
      await updateSoftware(software);
    } else {
      await createSoftware(software);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditSoftware = (software: Software) => {
    setEditingSoftware(software);
    setModalOpen(true);
  };

  const handleDeleteSoftware = async (id: number) => {
    await deleteSoftware(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Software
      </Button>
      <SoftwareTable softwares={softwares} onEdit={handleEditSoftware} onDelete={handleDeleteSoftware} />
      <SoftwareModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveSoftware} software={editingSoftware} />
    </Box>
  );
};

export default SoftwarePage;
