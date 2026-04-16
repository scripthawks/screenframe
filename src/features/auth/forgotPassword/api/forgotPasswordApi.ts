import { baseApi, BaseResponse } from '@/shared/api'

import { ForgotPasswordParams } from './types/forgotPasswordParams'

const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    forgotPassword: build.mutation<
      BaseResponse<{
        email: string
      }>,
      ForgotPasswordParams
    >({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/password-recovery',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useForgotPasswordMutation } = forgotPasswordApi
