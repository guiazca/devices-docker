import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Brand } from './types';

interface BrandTableProps {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (id: number) => void;
}

const BrandTable: React.FC<BrandTableProps> = ({ brands, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.nome}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(brand)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(brand.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BrandTable;
