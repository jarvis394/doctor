import React from 'react'
import * as Screens from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './app.routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

export type RootStackParamList = {
  App: undefined
  AppointmentScreen: {
    id: string
  }
}

export type StackNavigationProps<
  Screen extends keyof RootStackParamList | never = never,
> = NativeStackScreenProps<RootStackParamList, Screen>

const Stack = createNativeStackNavigator<RootStackParamList>()

const Routes: React.FC = () => {
  const theme = useAdaptiveTheme()

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'App',
        })}
      >
        <Stack.Screen name="App" component={AppRoutes} />
        <Stack.Screen
          name="AppointmentScreen"
          options={{ headerTitle: 'Посещение' }}
          component={Screens.AppointmentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
