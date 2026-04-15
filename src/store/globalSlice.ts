import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GlobalState {
  isAuthChecking: boolean
  isInitialized: boolean
}

const initialState: GlobalState = {
  isAuthChecking: false,
  isInitialized: false,
}

const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {
    setGlobalAuthChecking: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setGlobalAuthChecking } = globalSlice.actions
export const { reducer: globalReducer } = globalSlice
