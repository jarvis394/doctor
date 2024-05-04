import React from 'react'
import * as Screens from '@screens'
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabScreenProps,
} from '@react-navigation/material-bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackNavigationProps } from '@routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'

export type BottomTabParamList = {
  MainScreen: undefined
  AssistantScreen: undefined
}

export type BottomTabNavigationProps<
  Screen extends keyof BottomTabParamList | never = never,
> = CompositeScreenProps<
  MaterialBottomTabScreenProps<BottomTabParamList, Screen>,
  StackNavigationProps
>

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>()

const AppRoutes: React.FC = () => {
  const theme = useAdaptiveTheme()

  return (
    <Tab.Navigator theme={theme}>
      <Tab.Screen
        name="MainScreen"
        options={{
          tabBarLabel: 'Здоровье',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'favorite' : 'favorite-outline'}
              color={color}
              size={24}
            />
          ),
        }}
        component={Screens.MainScreen}
      />
      <Tab.Screen
        name="AssistantScreen"
        options={{
          tabBarLabel: 'Ассистент',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? 'chat-bubble' : 'chat-bubble-outline'}
              color={color}
              size={24}
            />
          ),
        }}
        component={Screens.AssistantScreen}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes
