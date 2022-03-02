import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import usePageTitle from '../hooks/usePageTitle';
import { RootState } from 'store';
import { request } from '../network';
const Layout: FC = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const pageTitle = usePageTitle(pathname);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate('/login', { replace: true });
    // }
    request('get', 'http://127.0.0.1:8000/api/v1/community/review/');
  }, [isLoggedIn]);
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
