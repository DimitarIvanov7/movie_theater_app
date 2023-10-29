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
      console.log(action);

      const { accessToken, refreshToken } = action.payload.data;

      const decodedToken = jwt.decode(accessToken) as JwtPayload;

      const name = decodedToken.name;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.name = name;
    },
    logout: (state, action) => {
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AppState): User => state.auth;
