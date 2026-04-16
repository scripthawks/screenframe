import { VerifyEmailParams } from '@/features/auth/verifyEmail/api/types/verifyEmailParams'
import { baseApi, BaseResponse } from '@/shared'

export const verifyEmailApi = baseApi.injectEndpoints({
  endpoints: build => ({
    verifyEmail: build.mutation<BaseResponse<{ code: string }>, VerifyEmailParams>({
      query: ({ code }) => ({
        body: {
          confirmationToken: code,
        },
        method: 'POST',
        url: 'auth/verify-email',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useVerifyEmailMutation } = verifyEmailApi
