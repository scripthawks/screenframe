import { baseApi, BaseResponse } from '@/shared'

export const resendVerificationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendVerification: build.mutation<BaseResponse, { email: string }>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/resend-verification',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useResendVerificationMutation } = resendVerificationApi
