import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button component={Link} to="/devices">
          <ListItemText primary="Devices" />
        </ListItem>
        <ListItem button component={Link} to="/locations">
          <ListItemText primary="Localizações" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemText primary="Categorias" />
        </ListItem>
        <ListItem button component={Link} to="/brands">
          <ListItemText primary="Marcas" />
        </ListItem>
        <ListItem button component={Link} to="/model">
          <ListItemText primary="Modelos" />
        </ListItem>
        <ListItem button component={Link} to="/softwares">
          <ListItemText primary="Softwares" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
