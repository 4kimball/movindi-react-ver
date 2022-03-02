import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

interface UserState {
  isLoggedIn: boolean;
  username: string;
}

const DEFAULT_STATE: UserState = {
  isLoggedIn: false,
  username: '',
};

const initialState: UserState = {
  isLoggedIn: false,
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action) => {
      return {
        isLoggedIn: true,
        ...action.payload,
      };
    },
    logout: () => {
      return { ...DEFAULT_STATE };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
