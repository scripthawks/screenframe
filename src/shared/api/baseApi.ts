import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseQueryWithReAuth } from './baseQueryWithReAuth'

function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE
}
export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'User', 'Users', 'Post', 'Posts', 'Payments', 'Profile', 'Devices'],
})
