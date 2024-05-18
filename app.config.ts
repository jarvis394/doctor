import { ExpoConfig, ConfigContext } from 'expo/config'
import 'dotenv/config'

declare let process: {
  env: {
    API_KEY: string
    AUTH_DOMAIN: string
    PROJECT_ID: string
    STORAGE_BUCKET: string
    MESSAGING_SENDER_ID: string
    MEASUREMENT_ID: string
    APP_ID: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_props: ConfigContext): ExpoConfig => ({
  name: 'dentist-app',
  slug: 'dentist-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.jarvis394.dentistapp',
    googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    googleServicesFile: './google-services.json',
    package: 'com.jarvis394.dentistapp',
  },
  plugins: [
    'expo-font',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  extra: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  },
})
