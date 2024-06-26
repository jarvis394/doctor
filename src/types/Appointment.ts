import { Doctor } from './Doctor'

export enum AppointmentTag {
  RECURRING = 'recurring',
  ONE_TIME_VISIT = 'one-time-visit',
  CONSULTATION = 'consultation',
}

export interface AppointmentFile {
  filename: string
  downloadUrl: string
}

export interface Appointment {
  id: string
  title: string
  doctor?: Doctor
  time: number
  place: string
  comment?: string
  files: AppointmentFile[]
  tags: AppointmentTag[]
}
