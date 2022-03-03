import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import usePageTitle from '../hooks/usePageTitle';
import { RootState } from 'store';

const Layout: FC = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const pageTitle = usePageTitle(pathname);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '##1a1a1a',
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
