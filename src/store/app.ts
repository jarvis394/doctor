import { createSlice } from '@reduxjs/toolkit'

interface AppState {}

const initialState: AppState = {}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

// export const { setUserAuthData } = slice.actions

export default slice.reducer
