import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store/store';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface User {
  name: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, refreshToken: null, name: null } as User,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      const decodedToken = jwt.decode(accessToken) as JwtPayload;

      const name = decodedToken.name;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.name = name;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice;

export const selectCurrentUser = (state: AppState): User => state.auth.name;
