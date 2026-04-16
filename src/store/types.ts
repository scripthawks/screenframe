'use client'

import { useDispatch, useSelector, useStore } from 'react-redux'

import { SignInSchema } from '@/features'
import { AuthSchema, baseApi } from '@/shared'
import { makeStore } from '@/store'

export type AppStore = ReturnType<typeof makeStore>
export type AppRootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()
export const useAppStore = useStore.withTypes<AppStore>()
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  authMe: AuthSchema
  signIn: SignInSchema
  global: {
    isAuthChecking: boolean
  }
}
