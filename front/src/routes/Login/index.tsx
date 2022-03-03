import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

import LoginForm from './LoginForm';
const Login: FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: 600 }}>
        <CardContent sx={{ padding: 4 }}>
          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
