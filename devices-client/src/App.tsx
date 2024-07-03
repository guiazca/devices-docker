import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import DevicesPage from './pages/devices/DevicesPage';
import BrandsPage from './pages/brand/BrandPage';
import CategoriesPage from './pages/categories/CategoryPage';
import LocationsPage from './pages/locations/LocationsPage';
import ModelsPage from './pages/model/ModelPage';
import SoftwarePage from './pages/software/SoftwarePage';



const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/devices" element={<DevicesPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path='model' element={<ModelsPage />} />
              <Route path="/" element={<Navigate to="/devices" />} />
              <Route path="/softwares" element={<SoftwarePage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
