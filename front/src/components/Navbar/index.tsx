import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { RootState } from 'store';

import { setLoggedIn } from '../../store/slices/userSlice';
const MenusTitle = ['Community', 'Profile'];

const MenuButton = styled(Button)({
  color: '#333333',
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: '#ff3385',
    color: '#fff',
  },
});
const Navbar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleClickLogout = () => {
    sessionStorage.removeItem('accessToken');
    dispatch(setLoggedIn(false));
    navigate('/login');
  };

  const LogoutButton = (
    <Button
      onClick={handleClickLogout}
      sx={{
        color: '#737373',
        padding: '0.5rem 1rem',
        '&:hover': {
          cursor: 'pointer',
          color: '#fff',
        },
      }}
    >
      logout
    </Button>
  );
  const Menus = isLoggedIn ? (
    MenusTitle.map((title) => <MenuButton>{title}</MenuButton>)
  ) : (
    <MenuButton>Login</MenuButton>
  );
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ff0066',
        width: '100%',
        height: '80px',
        padding: '0 1rem',
        position: 'fixed',
        top: '0',
        margin: 0,
      }}
    >
      <Box>
        <Typography variant="h1" color="#333333">
          Movindi
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '20%',
          padding: '1rem',
        }}
      >
        {Menus}
        {isLoggedIn ? LogoutButton : null}
      </Box>
    </Box>
  );
};

export default Navbar;
