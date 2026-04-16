import { baseApi, BaseResponse } from '@/shared/api'

import { CreateNewPasswordParams } from './types/createNewPasswordParams'

const createNewPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createNewPassword: build.mutation<BaseResponse, CreateNewPasswordParams>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/new-password',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useCreateNewPasswordMutation } = createNewPasswordApi
