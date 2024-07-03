import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import LocationTable from './LocationsTable';
import LocationModal from './LocationsModal';
import { fetchLocations, createLocation, updateLocation, deleteLocation } from './api';
import { Location } from './types';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | undefined>(undefined);

  const fetchData = async () => {
    const data = await fetchLocations();
    setLocations(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingLocation(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveLocation = async (location: Location) => {
    if (location.id) {
      await updateLocation(location);
    } else {
      await createLocation(location);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setModalOpen(true);
  };

  const handleDeleteLocation = async (id: number) => {
    await deleteLocation(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Localização
      </Button>
      <LocationTable locations={locations} onEdit={handleEditLocation} onDelete={handleDeleteLocation} />
      <LocationModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveLocation} location={editingLocation} />
    </Box>
  );
};

export default LocationsPage;
