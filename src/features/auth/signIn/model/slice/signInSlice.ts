import { SignInSchema } from '@/features'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const signInSlice = createSlice({
  initialState: {} as SignInSchema,
  name: 'signIn',
  reducers: {
    clearAccessToken: state => {
      state.accessToken = null
    },
    clearId: state => {
      state.id = null
    },
    setAccessToken: (state, action: PayloadAction<SignInSchema>) => {
      state.accessToken = action.payload.accessToken
    },
    setId: (state, action: PayloadAction<SignInSchema>) => {
      state.id = action.payload.id
    },
  },
})

export const { clearAccessToken, clearId, setAccessToken, setId } = signInSlice.actions

export const { reducer: signInReducer } = signInSlice
