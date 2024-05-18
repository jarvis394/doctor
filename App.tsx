import React, { useCallback, useMemo } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useGoogleFonts } from '@hooks/useGoogleFonts'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import { ThemeProvider } from '@emotion/react'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import Routes from '@routes'
import tinycolor from 'tinycolor2'
import dayjs from 'dayjs'
import store from '@store/index'

import 'dayjs/locale/ru'
import 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

dayjs.locale('ru')

const App: React.FC = () => {
  const theme = useAdaptiveTheme()
  const [fontsLoaded, fontError] = useGoogleFonts()
  const statusBarColor = useMemo(
    () => tinycolor(theme.colors.surface).setAlpha(0.75).toRgbString(),
    [theme.colors.surface]
  )

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
      await NavigationBar.setPositionAsync('absolute')
      await NavigationBar.setBackgroundColorAsync('transparent')
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StatusBar
              translucent
              backgroundColor={statusBarColor}
              style="light"
            />
            <Routes />
          </ThemeProvider>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  )
}

export default App
