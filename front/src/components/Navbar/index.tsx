import { FC } from 'react';
import { Box, Typography } from '@mui/material';
const Navbar: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ff0066',
        width: '100%',
        height: '80px',
        padding: '0 0.5rem',
        position: 'fixed',
        top: '0',
        margin: 0,
      }}
    >
      <Box>
        <Typography variant="h1">Movindi</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '20%',
        }}
      >
        <Typography variant="h1">Actors</Typography>
        <Typography variant="h1">Cmmunity</Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
