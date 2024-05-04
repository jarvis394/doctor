import React from 'react'
import styled from '@emotion/native'
import { Text, TouchableRipple } from 'react-native-paper'
import { View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'

const Root = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

const TouchableHeader = styled(TouchableRipple)({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
})

const HeaderTitle = styled(Text)({
  fontSize: 24,
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 31,
  flexGrow: 1,
  flexDirection: 'row',
  paddingTop: 16,
  paddingLeft: 16,
  userSelect: 'none',
})

const Content = styled.View({
  paddingHorizontal: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

const IconContainer = styled.View({
  paddingTop: 16,
  paddingRight: 16,
  height: '100%',
  justifyContent: 'center',
})

type SectionProps = React.PropsWithChildren<{
  title?: string
  onPress?: () => void
}>

const Section: React.FC<SectionProps> = ({ title, onPress, children }) => {
  const Header = onPress ? TouchableHeader : View
  const theme = useAdaptiveTheme()

  return (
    <Root>
      <Header onPress={onPress}>
        <>
          {title && <HeaderTitle>{title}</HeaderTitle>}
          {onPress && (
            <IconContainer>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.text}
              />
            </IconContainer>
          )}
        </>
      </Header>
      <Content>{children}</Content>
    </Root>
  )
}

export default Section
