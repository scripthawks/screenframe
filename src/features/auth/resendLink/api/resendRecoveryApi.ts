import { baseApi, BaseResponse } from '@/shared'

export const resendRecoveryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendRecovery: build.mutation<BaseResponse, { email: string }>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/password-recovery-resending',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useResendRecoveryMutation } = resendRecoveryApi
