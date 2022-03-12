import { useQuery } from 'react-query';
import { getMovies } from '../apis/movieApi';

const useMovieQuery = () => {
  return useQuery(['getMovies'], () => {
    return getMovies();
  });
};

export default useMovieQuery;
