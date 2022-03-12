import { FC, useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';

import MovieItem from './MovieItem';
import useMovieQuery from '../../hooks/useMovieQuery';
const Movies: FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const { data: res } = useMovieQuery();

  useEffect(() => {
    const data = res?.data;
    setMovies(data);
  }, [res]);
  console.log(movies);
  return (
    <Box>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: '2rem',
        }}
      >
        {movies?.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default Movies;
