import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import CategoryTable from './CategoryTable';
import CategoryModal from './CategoryModal';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from './api';
import { Category } from './types';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  const fetchData = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingCategory(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveCategory = async (category: Category) => {
    if (category.id) {
      await updateCategory(category);
    } else {
      await createCategory(category);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Categoria
      </Button>
      <CategoryTable categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
      <CategoryModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveCategory} category={editingCategory} />
    </Box>
  );
};

export default CategoriesPage;
