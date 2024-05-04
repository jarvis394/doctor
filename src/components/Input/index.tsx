import styled from '@emotion/native'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import React, { useMemo } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import tinycolor from 'tinycolor2'

const Root = styled(TextInput)(({ theme }) => ({
  borderRadius: 24,
  borderWidth: 0,
  flexGrow: 1,
  backgroundColor: theme.colors.elevation.level1,
  paddingVertical: 14,
  paddingHorizontal: 20,
  color: theme.colors.text,
  fontFamily: 'GoogleSans-Regular',
  fontSize: 16,
}))

const Input: React.FC<TextInputProps> = (props) => {
  const theme = useAdaptiveTheme()
  const placeholderTextColor = useMemo(
    () => tinycolor(theme.colors.secondary).setAlpha(0.32).toRgbString(),
    [theme.colors.secondary]
  )

  return (
    <Root
      {...props}
      cursorColor={theme.colors.secondary}
      placeholderTextColor={placeholderTextColor}
    />
  )
}

export default Input
