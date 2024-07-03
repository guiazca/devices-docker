import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, TablePagination } from '@mui/material';
import { Device } from './types';

interface DeviceTableProps {
  devices: Device[];
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEdit: (device: Device) => void;
  onDelete: (id: number) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, totalItems, page, pageSize, onPageChange, onRowsPerPageChange, onEdit, onDelete }) => {
  console.log('DeviceTable props:', { devices, totalItems, page, pageSize }); // Log de depuração
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Mac Address</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Status</TableCell> {/* Adiciona a coluna Status */}
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.descricao}</TableCell>
              <TableCell>{device.marcaNome}</TableCell>
              <TableCell>{device.modeloNome}</TableCell>
              <TableCell>{device.localizacaoNome}</TableCell>
              <TableCell>{device.categoriaNome}</TableCell>
              <TableCell>{device.macAddress}</TableCell>
              <TableCell>
              <a href={formatUrl(device?.url!)} target="_blank" rel="noopener noreferrer">
                  {device.url}
                </a>
              </TableCell>
              <TableCell>
                <span style={{ color: device.isOnline ? 'green' : 'red' }}>
                  &#x25CF; {/* Círculo verde ou vermelho */}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(device)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(device.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={9}  // Atualiza colSpan
              count={totalItems}
              rowsPerPage={pageSize}
              page={page - 1}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
