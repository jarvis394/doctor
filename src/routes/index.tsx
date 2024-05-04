import React from 'react'
import * as Screens from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './app.routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  App: undefined
  AppointmentScreen: {
    id: string
  }
  AssistantChatScreen:
    | {
        id: string
        create?: never
      }
    | {
        id?: never
        create: true
      }
}

export type StackNavigationProps<
  Screen extends keyof RootStackParamList | never = never,
> = StackScreenProps<RootStackParamList, Screen>

const Stack = createStackNavigator<RootStackParamList>()

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
        <Stack.Screen
          name="AssistantChatScreen"
          options={{ headerTitle: 'Чат' }}
          component={Screens.AssistantChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
