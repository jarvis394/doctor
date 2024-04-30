import React from 'react'
import { Button as PaperButton, ButtonProps } from 'react-native-paper'

export const Button: React.FC<ButtonProps> = ({
  children,
  contentStyle = {},
  labelStyle = {},
  style = {},
  ...props
}) => {
  return (
    <PaperButton
      mode="contained"
      contentStyle={{
        ...(typeof contentStyle === 'object' && { ...contentStyle }),
        height: 52,
      }}
      labelStyle={{
        ...(typeof labelStyle === 'object' && { ...labelStyle }),
        fontSize: 16,
        fontFamily: 'GoogleSans-Medium',
      }}
      style={{
        ...(typeof style === 'object' && { ...style }),
        borderRadius: 24,
      }}
      {...props}
    >
      {children}
    </PaperButton>
  )
}
