import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userInfo: User;
}

const DEFAULT_STATE: UserState = {
  isLoggedIn: false,
  userInfo: {
    username: '',
    pk: null,
    sns_id: '',
    sns_type: '',
    image: '',
    like_actors: [],
    like_movies: [],
    review_set: [],
    scrap_review: [],
  },
};

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    username: '',
    pk: null,
    sns_id: '',
    sns_type: '',
    image: '',
    like_actors: [],
    like_movies: [],
    review_set: [],
    scrap_review: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    setUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    logout: () => {
      return { ...DEFAULT_STATE };
    },
  },
});

export const { setLoggedIn, setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
