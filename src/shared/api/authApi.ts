import { baseApi } from '@/shared/api/baseApi'

export type UserType = {
  id: number
  email: string
  userName: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserType, void>({
      providesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: 'auth/me',
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
  }),
})

export const { useGetMeQuery, useLazyGetMeQuery, useLogoutMutation } = authApi
