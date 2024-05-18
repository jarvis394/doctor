import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/types/User'

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    },
    setIsAuthLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setIsLoggedIn(state, { payload }: PayloadAction<boolean>) {
      state.isLoggedIn = payload
    },
  },
})

export const { setIsAuthLoading, setIsLoggedIn, setUserData } = slice.actions

export const getIsLoggedIn = ({ auth }: { auth: AuthState }) => auth.isLoggedIn
export const getIsLoading = ({ auth }: { auth: AuthState }) => auth.isLoading
export const getUser = ({ auth }: { auth: AuthState }) => auth.user

export default slice.reducer
