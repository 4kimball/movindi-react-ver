import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
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
          <Typography align="center" variant="h3" sx={{ marginBottom: 5 }}>
            Welcome To Movindi
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
