import { useFonts } from 'expo-font'

export const useGoogleFonts = (): [boolean, Error | null] => {
  const fonts = useFonts({
    'GoogleSans-Bold': require('../assets/fonts/GoogleSans/GoogleSans-Bold.ttf'),
    'GoogleSans-BoldItalic': require('../assets/fonts/GoogleSans/GoogleSans-BoldItalic.ttf'),
    'GoogleSans-Italic': require('../assets/fonts/GoogleSans/GoogleSans-Italic.ttf'),
    'GoogleSans-Medium': require('../assets/fonts/GoogleSans/GoogleSans-Medium.ttf'),
    'GoogleSans-MediumItalic': require('../assets/fonts/GoogleSans/GoogleSans-MediumItalic.ttf'),
    'GoogleSans-Regular': require('../assets/fonts/GoogleSans/GoogleSans-Regular.ttf'),
    'GoogleSansDisplay-Bold': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-Bold.ttf'),
    'GoogleSansDisplay-BoldItalic': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-BoldItalic.ttf'),
    'GoogleSansDisplay-Italic': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-Italic.ttf'),
    'GoogleSansDisplay-Medium': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-Medium.ttf'),
    'GoogleSansDisplay-MediumItalic': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-MediumItalic.ttf'),
    'GoogleSansDisplay-Regular': require('../assets/fonts/GoogleSansDisplay/GoogleSansDisplay-Regular.ttf'),
    'GoogleSansText-Bold': require('../assets/fonts/GoogleSansText/GoogleSansText-Bold.ttf'),
    'GoogleSansText-BoldItalic': require('../assets/fonts/GoogleSansText/GoogleSansText-BoldItalic.ttf'),
    'GoogleSansText-Italic': require('../assets/fonts/GoogleSansText/GoogleSansText-Italic.ttf'),
    'GoogleSansText-Medium': require('../assets/fonts/GoogleSansText/GoogleSansText-Medium.ttf'),
    'GoogleSansText-MediumItalic': require('../assets/fonts/GoogleSansText/GoogleSansText-MediumItalic.ttf'),
    'GoogleSansText-Regular': require('../assets/fonts/GoogleSansText/GoogleSansText-Regular.ttf'),
  })

  return fonts
}
