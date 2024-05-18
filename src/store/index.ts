import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import authReducer from './auth'
import appReducer from './app'
import doctorsReducer from './doctors'
import appointmentsReducer from './appointments'

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export default store

export type RootDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

type DispatchFunc = () => RootDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
