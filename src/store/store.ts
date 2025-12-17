import { signInReducer } from '@/features'
import { baseApi } from '@/shared/api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
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
