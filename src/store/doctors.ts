import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from '@utils/db'
import { Doctor } from 'src/types/Doctor'
import { FetchingState } from 'src/types/FetchingState'
import { AuthState } from './auth'

interface DoctorsState {
  data: Doctor[]
  state: FetchingState
  currentRequestId: string | null
  fetchError: string | null
}

const initialState: DoctorsState = {
  data: [],
  state: FetchingState.IDLE,
  currentRequestId: null,
  fetchError: null,
}

export const fetchDoctors = createAsyncThunk<
  Doctor[],
  void,
  { state: { doctors: DoctorsState; auth: AuthState } }
>('doctors/get', async (_, { getState, requestId }) => {
  const { user } = getState().auth
  const { state, currentRequestId } = getState().doctors

  if (state !== FetchingState.PENDING || requestId !== currentRequestId) {
    return []
  }

  if (!user) {
    console.warn('fetchDoctors: No user')
    return []
  }

  const docs = await db.doctors(user.id)
  const res: Doctor[] = []

  docs.forEach((doc) => {
    const data = doc.data()
    res.push({ ...data, id: doc.id })
  })

  return res
})

const slice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors(state, { payload }: PayloadAction<Doctor[]>) {
      state.data = payload
    },
    addDoctor(state, { payload }: PayloadAction<Doctor>) {
      state.data = [...state.data, payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state, action) => {
        if (state.state !== FetchingState.IDLE) {
          return
        }

        state.state = FetchingState.PENDING
        state.currentRequestId = action.meta.requestId
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (
          state.state !== FetchingState.PENDING ||
          state.currentRequestId !== requestId ||
          !action.payload
        ) {
          return
        }

        state.state = FetchingState.FULFILLED
        state.data = action.payload
        state.currentRequestId = null
      })
  },
})

export const { setDoctors, addDoctor } = slice.actions

export const getDoctors = ({ doctors }: { doctors: DoctorsState }) =>
  doctors.data

export default slice.reducer
