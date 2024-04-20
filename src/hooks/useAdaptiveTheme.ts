import { theme as baseTheme } from '@config/theme'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { Theme } from '@react-navigation/native'
import { MD3Theme } from 'react-native-paper'

export const useAdaptiveTheme = (): Theme & MD3Theme => {
  const { theme } = useMaterial3Theme({ fallbackSourceColor: '#326AFA' })

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...theme.dark,
    },
  }
}
