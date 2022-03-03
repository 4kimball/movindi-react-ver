import { request } from '../network';
import jwt_decode from 'jwt-decode';

export const login = async (username: string, password: string) => {
  const response = await request('post', 'api/v1/token/', null, {
    username,
    password,
  });

  const token = response.data.access;
  return jwt_decode(token);
};
