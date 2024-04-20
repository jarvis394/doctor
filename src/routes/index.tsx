import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppRoutes from './app.routes'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  const theme = useAdaptiveTheme()

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="AppRoutes"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AppRoutes" component={AppRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
