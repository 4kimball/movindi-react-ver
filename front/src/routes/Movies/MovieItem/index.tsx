import { FC } from 'react';
import { ListItem } from '@mui/material';
import { Grid } from '@mui/material';
const MovieItem: FC<{
  movie: Movie;
}> = ({ movie }) => {
  return (
    <Grid
      item
      xs={3}
      sx={{
        paddingLeft: 0,
      }}
    >
      <ListItem
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& > img': {
            borderRadius: 5,
          },
          '& > img:hover': {
            transition: 'all 0.5s ease-in-out',
            transform: 'scale(1.1)',
            cursor: 'pointer',
          },
        }}
      >
        <img src={movie.poster_path} width="200px" height="270px" />
      </ListItem>
    </Grid>
  );
};

export default MovieItem;
