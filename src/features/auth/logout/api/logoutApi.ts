import { clearAccessToken, clearId, SignInSchema } from '@/features'
import {
  BackendErrorMessage,
  baseApi,
  BaseResponse,
  clearAuthMeData,
  RtkQueryError,
  showToast,
} from '@/shared'

export const logoutApi = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<BaseResponse<SignInSchema>, void>({
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(clearAccessToken())
          dispatch(clearId())
          dispatch(clearAuthMeData())
        } catch (e) {
          const error = e as RtkQueryError
          const err = error.error.data as BackendErrorMessage

          showToast(false, `${err.message}`)
        }
      },
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
  }),
})

export const { useLogoutMutation } = logoutApi
