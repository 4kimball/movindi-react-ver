import { request } from '../network';
import jwt_decode from 'jwt-decode';

export const login = async (username: string, password: string) => {
  const response = await request('post', 'api/v1/token/', null, {
    username,
    password,
  });

  return response;
};

export const getUserInfoByUserName = async (username: string) => {
  const response = await request('get', `api/v1/accounts/user/${username}`);
  return response;
};
