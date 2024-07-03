import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { fetchModels, createModel, updateModel, deleteModel, fetchBrands } from './api';
import { Model } from './types';
import { Brand } from '../brand/types';
import ModelTable from './ModelTable';
import ModelModal from './ModelModal';

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | undefined>(undefined);

  const fetchData = async () => {
    const modelsData = await fetchModels();
    const brandsData = await fetchBrands();
    setModels(modelsData);
    setBrands(brandsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingModel(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveModel = async (model: Model) => {
    if (model.id && model.marcaNome) {
      await updateModel(model);
    } else {
      await createModel(model);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditModel = (model: Model) => {
    setEditingModel(model);
    setModalOpen(true);
  };

  const handleDeleteModel = async (id: number) => {
    await deleteModel(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Modelo
      </Button>
      <ModelTable models={models} onEdit={handleEditModel} onDelete={handleDeleteModel} />
      <ModelModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveModel} model={editingModel} brands={brands} />
    </Box>
  );
};

export default ModelsPage;
