import { baseApi } from '@/shared/api/baseApi'

export type UserType = {
  id: number
  email: string
  userName: string
  emailVerified?: boolean
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
    verifyEmail: builder.mutation<{ message: string }, string>({
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'GET',
        url: 'auth/verify-email',
      }),
      transformErrorResponse: response => {
        return {
          status: response.status,
        }
      },
    }),
  }),
})

export const { useGetMeQuery, useLazyGetMeQuery, useLogoutMutation, useVerifyEmailMutation } =
  authApi
