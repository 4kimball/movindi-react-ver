import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  user: User;
}

const DEFAULT_STATE: UserState = {
  isLoggedIn: false,
  user: {
    username: '',
    pk: null,
    sns_id: '',
    sns_type: '',
  },
};

const initialState: UserState = {
  isLoggedIn: false,
  user: {
    username: '',
    pk: null,
    sns_id: '',
    sns_type: '',
  },
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
