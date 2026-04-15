import { signInReducer } from '@/features'
import { authMeReducer } from '@/shared'
import { baseApi } from '@/shared/api'
import { globalReducer } from '@/store/globalSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = {
  authMe: authMeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  global: globalReducer,
  signIn: signInReducer,
}

export const makeStore = () => {
  const store = configureStore({
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat([baseApi.middleware])
    },
    reducer: rootReducer,
  })

  setupListeners(store.dispatch)

  return store
}
