import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import { login } from '../../../apis/authApi';
const INPUT_OPTION = {
  username: {
    required: {
      value: true,
      message: '아이디를 입력해주세요.',
    },
  },
  password: {
    required: {
      value: true,
      message: '비밀번호를 입력해주세요.',
    },
  },
};
const onSubmit: SubmitHandler<{
  username: string;
  password: string;
}> = async (data) => {
  const { username, password } = data;
  const token = login(username, password);
  console.log(token);
};
const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        variant="outlined"
        fullWidth
        required
        label="아이디"
        error={!!errors.id}
        helperText={errors.id?.message}
        {...register('username', INPUT_OPTION.username)}
        sx={{
          mb: 3,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        required
        label="비밀번호"
        type="password"
        error={!!errors.id}
        helperText={errors.password?.message}
        {...register('password', INPUT_OPTION.password)}
        sx={{
          mb: 3,
        }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{
          padding: 1,
          fontSize: '1rem',
          backgroundColor: '#ff0066',
          '&:hover': {
            backgroundColor: '#ff3385',
          },
        }}
      >
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
