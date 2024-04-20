import React, { useCallback } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useGoogleFonts } from '@hooks/useGoogleFonts'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import Routes from '@routes'

import 'react-native-gesture-handler'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'

SplashScreen.preventAutoHideAsync()

const App: React.FC = () => {
  const theme = useAdaptiveTheme()
  const [fontsLoaded, fontError] = useGoogleFonts()

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
      await NavigationBar.setPositionAsync('absolute')
      await NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2)
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      {/* <StoreProvider store={store}> */}
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <Routes />
      </PaperProvider>
      {/* </StoreProvider> */}
    </SafeAreaProvider>
  )
}

export default App
