import { baseApi, setAuthMeData, showToast } from '@/shared'
import { AuthMeResponse } from '@/shared/hoc/api/types/authMeResponse'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<AuthMeResponse, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.userId) {
            dispatch(setAuthMeData({ authMeData: data }))
          }
        } catch (e) {
          showToast(false, 'Auth API error')
        }
      },
      providesTags: ['Me'],
      query: () => 'auth/me',
    }),
  }),
  overrideExisting: true,
})

export const { useLazyMeQuery, useMeQuery } = authApi
