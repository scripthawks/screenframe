import { AuthSchema } from '@/shared'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const authMeSlice = createSlice({
  initialState: {} as AuthSchema,
  name: 'authMe',
  reducers: {
    clearAuthMeData: state => {
      state.authMeData = {
        userId: null,
      }
    },
    setAuthMeData: (state, action: PayloadAction<AuthSchema>) => {
      state.authMeData = {
        email: action.payload.authMeData.email,
        isActive: action.payload.authMeData.isActive,
        userId: action.payload.authMeData.userId,
        userName: action.payload.authMeData.userName,
      }
    },
  },
})

export const { reducer: authMeReducer } = authMeSlice
export const { clearAuthMeData, setAuthMeData } = authMeSlice.actions
