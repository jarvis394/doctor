import { initializeApp, FirebaseOptions } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js'

// add firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
}

// initialize firebase
const app = initializeApp(firebaseConfig)

// initialize auth; only for native platforms (Android and iOS)
const auth = firebaseAuth.initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
const firestore = getFirestore()
const storage = getStorage()

export { auth, firestore, storage }
