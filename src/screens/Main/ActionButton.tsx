import styled from '@emotion/native'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import React, { useMemo } from 'react'
import { Text, TouchableRipple, TouchableRippleProps } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import tinycolor from 'tinycolor2'

const Root = styled(TouchableRipple)({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 28,
  height: 116,
  userSelect: 'none',
  width: '100%',
})

const Content = styled(Text)({
  fontFamily: 'GoogleSans-Medium',
  fontSize: 16,
  flexShrink: 1,
})

type ActionButtonProps = {
  icon: string
  title: string
  variant?: 'default' | 'gradient' | 'primary'
} & Omit<TouchableRippleProps, 'children'>

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  variant = 'default',
  ...props
}) => {
  const theme = useAdaptiveTheme()
  const backgroundColor = useMemo(() => {
    switch (variant) {
      case 'default':
        return theme.colors.elevation.level2
      case 'gradient':
        return theme.colors.elevation.level1
      case 'primary':
        return tinycolor(theme.colors.primary).setAlpha(0.24).toRgbString()
    }
  }, [
    theme.colors.elevation.level1,
    theme.colors.elevation.level2,
    theme.colors.primary,
    variant,
  ])
  const color = useMemo(() => {
    switch (variant) {
      case 'default':
        return theme.colors.text
      case 'gradient':
        return theme.colors.text
      case 'primary':
        return theme.colors.onPrimaryContainer
    }
  }, [theme.colors.onPrimaryContainer, theme.colors.text, variant])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error Props somehow invalid type
    <Root {...props} borderless style={{ backgroundColor }}>
      <>
        <MaterialIcons name={icon} size={24} color={color} />
        <Content style={{ color }}>{title}</Content>
      </>
    </Root>
  )
}

export default ActionButton
