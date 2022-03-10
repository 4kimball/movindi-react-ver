import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { Box, Card, CardContent } from '@mui/material';

import LoginForm from './LoginForm';

import { login, getUserInfoByUserName } from '../../apis/authApi';
import { setLoggedIn, setUserInfo } from '../../store/slices/userSlice';
const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
  }> = async (data) => {
    const { username, password } = data;
    login(username, password)
      .then((res) => {
        sessionStorage.setItem('accessToken', res.data.access);
        dispatch(setLoggedIn(true));
        getUserInfoByUserName(username).then((res) => {
          dispatch(setUserInfo(res.data));
        });
      })
      .then(() => {
        navigate('/');
      });
  };
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
          <LoginForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
