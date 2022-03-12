import { createSlice } from '@reduxjs/toolkit';

interface MovieState {
  movies: Array<Movie>;
}

const initialState: MovieState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      return {
        ...state,
        movies: action.payload,
      };
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
