import { request } from '../network';

export const getMovies = async () => {
  const response = await request('get', 'api/v1/movies/');
  return response;
};
