import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Model } from './types';

interface ModelTableProps {
  models: Model[];
  onEdit: (model: Model) => void;
  onDelete: (id: number) => void;
}

const ModelTable: React.FC<ModelTableProps> = ({ models, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell>{model.nome}</TableCell>
              <TableCell>{model.marcaNome}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(model)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(model.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelTable;
