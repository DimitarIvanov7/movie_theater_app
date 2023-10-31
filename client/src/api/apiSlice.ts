import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/auth/authSlice';
import { AppStore } from '../features/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_URL,
  credentials: 'include', // remove that to fix the main backend endpoint
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as AppStore;
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    const store = api.getState() as AppStore;

    if (refreshResult?.data) {
      const user = store.auth;
      // store the new token
      api.dispatch(setCredentials({ user, ...refreshResult.data }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout(store));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
