import { SingInData, SingUpData } from '@/src/types';
import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: SingInData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    singUp: builder.mutation({
      query: (credentials: SingUpData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSingUpMutation } = authApiSlice;
