import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db, typedCollection } from '@utils/db'
import { Appointment } from 'src/types/Appointment'
import { FetchingState } from 'src/types/FetchingState'
import { AuthState } from './auth'
import { DocumentReference, addDoc, getDoc } from 'firebase/firestore'
import { setDoctors } from './doctors'

interface AppointmentsState {
  data: Appointment[]
  state: FetchingState
  currentRequestId: string | null
  fetchError: string | null
}

const initialState: AppointmentsState = {
  data: [],
  state: FetchingState.IDLE,
  currentRequestId: null,
  fetchError: null,
}

export const fetchAppointments = createAsyncThunk<
  Appointment[],
  void,
  { state: { appointments: AppointmentsState; auth: AuthState } }
>('appointments/get', async (_, { getState, requestId, dispatch }) => {
  const { user } = getState().auth
  const { state, currentRequestId } = getState().appointments

  if (state !== FetchingState.PENDING || requestId !== currentRequestId) {
    return []
  }

  if (!user) {
    console.warn('fetchAppointments: No user')
    return []
  }

  const docs = await db.appointments(user.id)
  const res: Appointment[] = []

  docs.forEach((doc) => {
    const data = doc.data()
    res.push({ ...data, time: Number(data.time), id: doc.id })
  })

  const getDoctors = res.map((e) =>
    getDoc(e.doctor as unknown as DocumentReference)
  )

  const doctors: Array<Appointment['doctor']> = (
    await Promise.all(getDoctors)
  ).map((e) => {
    const data = e.data() as Appointment['doctor']
    return {
      ...data,
      id: e.id,
    }
  })

  for (const index in res) {
    const e = res[index]
    const doctor = doctors[index]
    if (!doctor) return []

    res[index] = {
      ...e,
      doctor,
    }
  }

  dispatch(setDoctors(doctors))

  return res
})

export const createAppointment = createAsyncThunk<
  Appointment,
  Appointment,
  { state: { appointments: AppointmentsState; auth: AuthState } }
>('appointments/create', async (appointment, { getState }) => {
  const { user } = getState().auth

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const docRef = await addDoc(
    typedCollection<Appointment>(`users/${user.id}/appointments`),
    appointment
  )
  const newAppointment = { ...appointment, id: docRef.id }

  return newAppointment
})

const slice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, { payload }: PayloadAction<Appointment[]>) {
      state.data = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state, action) => {
        if (state.state !== FetchingState.IDLE) {
          return
        }

        state.state = FetchingState.PENDING
        state.currentRequestId = action.meta.requestId
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
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

export const { setAppointments } = slice.actions

export const getAppointments = ({
  appointments,
}: {
  appointments: AppointmentsState
}) => appointments.data

export const getAppointmentsState = ({
  appointments,
}: {
  appointments: AppointmentsState
}) => appointments.state

export default slice.reducer
