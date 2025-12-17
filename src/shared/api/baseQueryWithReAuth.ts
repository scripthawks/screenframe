import { clearId, clearAccessToken, setAccessToken } from '@/features/auth/signIn'
import { BaseResponse } from '@/shared/api'
import { BASE_URL, resultCode, RoutesNames } from '@/shared/const'
import { AppRootState } from '@/store'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    if (typeof window === 'undefined') {
      return headers
    }
    const accessToken = (getState() as AppRootState).signIn.accessToken!

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  const resultData = result?.data as BaseResponse
  const isLoginEndpoint = result?.meta?.request.url.endsWith(RoutesNames.SIGN_IN)
  const error401 = resultData?.resultCode === resultCode.UNAUTHORIZED

  if (!isLoginEndpoint && error401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          { method: 'POST', url: 'auth/refresh-token' },
          api,
          extraOptions
        )
        const refresh = refreshResult.data as { accessToken: string }

        if (refresh) {
          api.dispatch(setAccessToken({ accessToken: refresh.accessToken }))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(clearAccessToken())
          api.dispatch(clearId())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
