import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

const Layout: FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#333333',
      }}
    >
      <Navbar />
      <Box
        sx={{
          marginTop: '80px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
