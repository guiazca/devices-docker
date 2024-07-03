import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { fetchBrands, createBrand, updateBrand, deleteBrand } from './api';
import { Brand } from './types';
import BrandTable from './BrandTable';
import BrandModal from './BrandModal';

const BrandsPage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | undefined>(undefined);

  const fetchData = async () => {
    const data = await fetchBrands();
    setBrands(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingBrand(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveBrand = async (brand: Brand) => {
    if (brand.id) {
      await updateBrand(brand);
    } else {
      await createBrand(brand);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setModalOpen(true);
  };

  const handleDeleteBrand = async (id: number) => {
    await deleteBrand(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Marca
      </Button>
      <BrandTable brands={brands} onEdit={handleEditBrand} onDelete={handleDeleteBrand} />
      <BrandModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveBrand} brand={editingBrand} />
    </Box>
  );
};

export default BrandsPage;
