import React from 'react'
import * as Screens from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './app.routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  App: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  AppointmentScreen: {
    id: string
  }
  AddAppointmentScreen: undefined
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
        initialRouteName="RegisterScreen"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'App',
          headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        })}
      >
        <Stack.Screen name="App" component={AppRoutes} />
        <Stack.Screen
          name="AppointmentScreen"
          options={{ headerTitle: 'Посещение' }}
          component={Screens.AppointmentScreen}
        />
        <Stack.Screen
          name="AddAppointmentScreen"
          options={{ headerTitle: 'Добавить посещение' }}
          component={Screens.AddAppointmentScreen}
        />
        <Stack.Screen
          name="AssistantChatScreen"
          options={{ headerTitle: 'Чат' }}
          component={Screens.AssistantChatScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{
            headerShown: true,
            headerTitle: 'Вход в аккаунт',
          }}
          component={Screens.LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{ headerShown: false }}
          component={Screens.RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
