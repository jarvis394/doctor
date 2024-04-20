import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import * as Screens from '@screens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  MainScreen: undefined
  AssistantScreen: undefined
}

export type NavigationProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

const Stack = createStackNavigator<RootStackParamList>()

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={Screens.MainScreen} />
      <Stack.Screen
        name="AssistantScreen"
        component={Screens.AssistantScreen}
      />
    </Stack.Navigator>
  )
}

export default AppRoutes
