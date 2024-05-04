import { MD3DarkTheme as PaperDarkTheme, MD3Theme } from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'

export const theme: NavigationTheme & MD3Theme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  mode: 'exact',
  fonts: {
    displaySmall: {
      fontFamily: 'GoogleSansDisplay-Regular',
      fontSize: 36,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 44,
    },
    displayMedium: {
      fontFamily: 'GoogleSansDisplay-Medium',
      fontSize: 45,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 52,
    },
    displayLarge: {
      fontFamily: 'GoogleSansDisplay-Bold',
      fontSize: 57,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 64,
    },

    labelSmall: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 11,
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelMedium: {
      fontFamily: 'GoogleSans-Medium',
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: 'GoogleSans-Medium',
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.1,
      lineHeight: 20,
    },

    headlineSmall: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 24,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      fontFamily: 'GoogleSans-Medium',
      fontSize: 28,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontFamily: 'GoogleSans-Bold',
      fontSize: 32,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 40,
    },

    titleSmall: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleMedium: {
      fontFamily: 'GoogleSans-Medium',
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: 'GoogleSans-Bold',
      fontSize: 22,
      fontWeight: '400',
      letterSpacing: 0,
      lineHeight: 28,
    },

    bodySmall: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    bodyMedium: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: 'GoogleSans-Regular',
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.15,
      lineHeight: 24,
    },

    default: {
      fontFamily: 'GoogleSans-Regular',
      fontWeight: '400',
      letterSpacing: 0,
      fontStyle: 'normal',
    },
  },
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'rgb(181, 196, 255)',
    onPrimary: 'rgb(0, 41, 123)',
    primaryContainer: 'rgb(0, 60, 172)',
    onPrimaryContainer: 'rgb(220, 225, 255)',
    secondary: 'rgb(177, 197, 255)',
    onSecondary: 'rgb(0, 44, 113)',
    secondaryContainer: 'rgb(28, 67, 143)',
    onSecondaryContainer: 'rgb(218, 226, 255)',
    tertiary: 'rgb(227, 186, 219)',
    onTertiary: 'rgb(67, 39, 64)',
    tertiaryContainer: 'rgb(91, 61, 87)',
    onTertiaryContainer: 'rgb(255, 215, 247)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(228, 226, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(228, 226, 230)',
    surfaceVariant: 'rgb(69, 70, 79)',
    onSurfaceVariant: 'rgb(198, 198, 208)',
    outline: 'rgb(143, 144, 154)',
    outlineVariant: 'rgb(69, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(228, 226, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(0, 81, 225)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 35, 42)',
      level2: 'rgb(39, 41, 49)',
      level3: 'rgb(44, 46, 56)',
      level4: 'rgb(46, 47, 58)',
      level5: 'rgb(49, 51, 62)',
    },
    surfaceDisabled: 'rgba(228, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(228, 226, 230, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
  },
} as const

declare module '@emotion/react' {
  type CustomTheme = typeof theme
  export interface Theme extends CustomTheme {}
}
