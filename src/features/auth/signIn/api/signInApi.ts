import { setAccessToken, SignInSchema } from '@/features'
import { SignInParams } from '@/features/auth/signIn/api/types/signInParams'
import { BackendErrorMessage, baseApi, RtkQueryError, showToast } from '@/shared'

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<{ accessToken: string }, SignInParams>({
      invalidatesTags: ['Me', 'Profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.accessToken) {
            dispatch(setAccessToken(data as SignInSchema))
          }
        } catch (e) {
          const error = e as RtkQueryError
          const err = error.error.data as BackendErrorMessage

          showToast(false, `${err.message}`)
        }
      },
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useSignInMutation } = signInApi
