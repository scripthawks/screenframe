import { SignUpParams } from '@/features/auth/signUp/api/types/signUpParams'
import { baseApi, BaseResponse } from '@/shared/api'
import { BASE_FRONT_URL } from '@/shared/const'

export const signUpApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<BaseResponse<{ email: string }>, SignUpParams>({
      query: ({ agreeToTerms: acceptedTerms, username: userName, ...data }) => ({
        body: {
          ...data,
          baseUrl: BASE_FRONT_URL,
          userName,
        },
        method: 'POST',
        url: 'auth/signup',
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUpApi
