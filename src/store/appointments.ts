import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db, typedCollection, typedDoc } from '@utils/db'
import { Appointment } from 'src/types/Appointment'
import { FetchingState } from 'src/types/FetchingState'
import { AuthState } from './auth'
import {
  DocumentReference,
  UpdateData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { setDoctors } from './doctors'
import { Doctor } from 'src/types/Doctor'
import { firestore } from '@config/firebase'

interface AppointmentsState {
  currentEditingAppointment:
    | (Omit<Appointment, 'id' | 'doctor'> & { doctor?: string; id?: string })
    | null
  data: Appointment[]
  state: FetchingState
  currentRequestId: string | null
  fetchError: string | null
}

const DEFAULT_APPOINTMENT: AppointmentsState['currentEditingAppointment'] = {
  files: [],
  place: '',
  tags: [],
  time: Date.now(),
  title: '',
}

const initialState: AppointmentsState = {
  data: [],
  currentEditingAppointment: null,
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

  const getDoctors = res.map(
    (e) => e.doctor && getDoc(e.doctor as unknown as DocumentReference)
  )

  const doctors: Array<Doctor | undefined> = (
    await Promise.all(getDoctors)
  ).map((e) => {
    const data = e?.data() as Doctor

    if (!e) return undefined

    return {
      ...data,
      id: e.id,
    }
  })

  for (const index in res) {
    const e = res[index]
    const doctor = doctors[index]
    if (!doctor) continue

    res[index] = {
      ...e,
      doctor,
    }
  }

  const filteredDoctors = doctors.filter((e) => e) as Doctor[]

  dispatch(setDoctors(filteredDoctors))

  return res
})

export const createAppointment = createAsyncThunk<
  Appointment,
  Omit<AppointmentsState['currentEditingAppointment'], 'id'>,
  { state: { appointments: AppointmentsState; auth: AuthState } }
>('appointments/create', async (appointment, { getState, dispatch }) => {
  const { user } = getState().auth

  if (!user) {
    throw new Error('User is not authenticated')
  }

  if (!appointment) {
    throw new Error('No object given')
  }

  const docRef = await addDoc(
    typedCollection<Appointment>(`users/${user.id}/appointments`),
    {
      ...appointment,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      doctor: doc(firestore, appointment.doctor),
    }
  )
  const newAppointment = { ...appointment, id: docRef.id } as Appointment

  dispatch(addAppointment(newAppointment))

  return newAppointment
})

export const editAppointment = createAsyncThunk<
  Appointment,
  UpdateData<AppointmentsState['currentEditingAppointment']>,
  { state: { appointments: AppointmentsState; auth: AuthState } }
>('appointments/update', async (appointment, { getState, dispatch }) => {
  const { user } = getState().auth

  if (!user) {
    throw new Error('User is not authenticated')
  }

  if (!appointment) {
    throw new Error('No object given')
  }

  await updateDoc(
    typedDoc<Appointment>(`users/${user.id}/appointments/${appointment?.id}`),
    {
      ...appointment,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      doctor: doc(firestore, appointment.doctor),
    }
  )

  dispatch(setAppointment(appointment as Appointment))

  return appointment as Appointment
})

export const deleteAppointment = createAsyncThunk<
  boolean,
  string,
  { state: { appointments: AppointmentsState; auth: AuthState } }
>('appointments/update', async (id, { getState, dispatch }) => {
  const { user } = getState().auth

  if (!user) {
    throw new Error('User is not authenticated')
  }

  await deleteDoc(typedDoc<Appointment>(`users/${user.id}/appointments/${id}`))

  dispatch(deleteAppointmentInStore(id))

  return true
})

const slice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, { payload }: PayloadAction<Appointment[]>) {
      state.data = payload
    },
    setAppointment(state, { payload }: PayloadAction<Appointment>) {
      state.data = state.data.map((e) => {
        if (e.id !== payload.id) return e
        else return payload
      })
    },
    deleteAppointmentInStore(state, { payload }: PayloadAction<string>) {
      state.data = state.data.filter((e) => e.id !== payload)
    },
    addAppointment(state, { payload }: PayloadAction<Appointment>) {
      state.data = [...state.data, payload]
    },
    resetCurrentEditingAppointment(state) {
      state.currentEditingAppointment = DEFAULT_APPOINTMENT
    },
    setCurrentEditingAppointment(
      state,
      { payload }: PayloadAction<AppointmentsState['currentEditingAppointment']>
    ) {
      state.currentEditingAppointment = payload
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

export const {
  setAppointments,
  setAppointment,
  deleteAppointmentInStore,
  addAppointment,
  setCurrentEditingAppointment,
  resetCurrentEditingAppointment,
} = slice.actions

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

export const getCurrentEditingAppointment = ({
  appointments,
}: {
  appointments: AppointmentsState
}) => appointments.currentEditingAppointment

export default slice.reducer
