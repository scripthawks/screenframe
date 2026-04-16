import { PasswordRecoveryParams } from '@/features/auth/passwordRecovery/api/types/passwordRecoveryParams'
import { baseApi, BaseResponse } from '@/shared/api'

const passwordRecoveryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    checkRecoveryToken: build.mutation<BaseResponse, PasswordRecoveryParams>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/check-recovery-token',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useCheckRecoveryTokenMutation } = passwordRecoveryApi
