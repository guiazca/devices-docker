import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Location } from './types';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ locations, onEdit, onDelete }) => {
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
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{location.nome}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(location)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(location.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationTable;
