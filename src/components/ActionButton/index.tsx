import React from 'react'
import { Button as PaperButton, ButtonProps } from 'react-native-paper'

export const ActionButton: React.FC<ButtonProps> = ({
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
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      labelStyle={{
        ...(typeof labelStyle === 'object' && { ...labelStyle }),
        fontSize: 16,
        fontFamily: 'GoogleSans-Medium',
      }}
      style={{
        ...(typeof style === 'object' && { ...style }),
        borderRadius: 28,
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'space-between',
          paddingBottom: 10,
          paddingTop: 10,
          gap: 32,
        }}
      >
        {children}
      </div>
    </PaperButton>
  )
}
