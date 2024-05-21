import { firestore } from '@config/firebase'
import { User } from '../types/User'
import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { Appointment } from 'src/types/Appointment'
import { Doctor } from 'src/types/Doctor'
import { Chat } from 'src/types/Chat'
import { ChatMessage } from 'src/types/ChatMessage'

export const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (
    data: PartialWithFieldValue<T>
  ): PartialWithFieldValue<DocumentData> => {
    return data as PartialWithFieldValue<DocumentData>
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): T => {
    const data = snapshot.data()
    return data as T
  },
})

export const typedCollection = <T>(path: string, c = converter) => {
  return collection(firestore, path).withConverter(c<T>())
}

export const typedDoc = <T>(path: string, c = converter) => {
  return doc(firestore, path).withConverter(c<T>())
}

export const db = {
  user: (uid: string) => getDoc(typedDoc<User>(`users/${uid}`)),
  appointments: (uid: string) =>
    getDocs(typedCollection<Appointment>(`users/${uid}/appointments`)),
  doctors: (uid: string) =>
    getDocs(typedCollection<Doctor>(`users/${uid}/doctors`)),
  doctor: (userId: string, uid: string) =>
    getDocs(typedCollection<Doctor>(`users/${userId}/doctors/${uid}`)),
  chats: (uid: string) =>
    getDocs(typedCollection<Chat>(`users/${uid}/chats`)),
  chatMessages: (userId: string, uid: string) =>
    getDocs(
      typedCollection<ChatMessage>(`users/${userId}/chats/${uid}/history`)
    ),
}
