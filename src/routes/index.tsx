import React from 'react'
import * as Screens from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './app.routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  App: undefined
  LoginScreen: undefined
  SelectDoctorScreen?: { edit?: boolean }
  RegisterScreen: undefined
  AppointmentScreen: {
    id: string
  }
  AddAppointmentScreen: undefined
  SplashScreen: undefined
  AddDoctorScreen: undefined
  EditAppointmentScreen: {
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
        initialRouteName="SplashScreen"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'App',
          headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          cardStyle: {
            height: '100%',
            backgroundColor: theme.colors.background,
          },
        })}
      >
        <Stack.Screen name="App" component={AppRoutes} />
        <Stack.Screen
          name="SplashScreen"
          options={{ headerShown: false }}
          component={Screens.SplashScreen}
        />
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
        <Stack.Screen
          name="SelectDoctorScreen"
          options={{ headerShown: true, headerTitle: 'Выбрать врача' }}
          component={Screens.SelectDoctorScreen}
        />
        <Stack.Screen
          name="AddDoctorScreen"
          options={{ headerShown: true, headerTitle: 'Добавить врача' }}
          component={Screens.AddDoctorScreen}
        />
        <Stack.Screen
          name="EditAppointmentScreen"
          options={{ headerShown: true, headerTitle: 'Изменить посещение' }}
          component={Screens.EditAppointmentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
