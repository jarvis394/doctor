import React from 'react'
import styled from '@emotion/native'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProps } from '@routes/app.routes'

const Root = styled(TouchableRipple)({
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  userSelect: 'none',
})

const Content = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 14,
  paddingHorizontal: 16,
})

const TagsContainer = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  gap: 6,
})

const InfoContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

const ListContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

const Title = styled(Text)({
  fontSize: 20,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 25,
})

const ListItem = styled.View({
  opacity: 0.63,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
})

const SecondaryText = styled(Text)({
  fontSize: 15,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 19,
})

const Tag = styled.View(({ theme }) => ({
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 100,
  backgroundColor: theme.colors.card,
}))

const TagText = styled(Text)({
  fontSize: 13,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Medium',
})

const AppointmentCardUnmemoized: React.FC = () => {
  const theme = useAdaptiveTheme()
  const navigation = useNavigation<BottomTabNavigationProps['navigation']>()

  const handlePress = () => {
    navigation.push('AppointmentScreen', { id: '1' })
  }

  return (
    <Root onPress={handlePress}>
      <>
        <Content elevation={2} mode="flat">
          <InfoContainer>
            <Title>Стоматолог-терапевт</Title>
            <ListContainer>
              <ListItem>
                <FeatherIcons
                  color={theme.colors.text}
                  name="map-pin"
                  size={16}
                />
                <SecondaryText>MEDI, пр. Металлистов, 9</SecondaryText>
              </ListItem>
              <ListItem>
                <MaterialIcons
                  color={theme.colors.text}
                  name="access-time"
                  size={16}
                />
                <SecondaryText>15 апреля, 15:00</SecondaryText>
              </ListItem>
            </ListContainer>
          </InfoContainer>
          <MaterialIcons
            color={theme.colors.text}
            name="chevron-right"
            size={24}
          />
        </Content>
        <TagsContainer elevation={1} mode="flat">
          <Tag>
            <TagText>Повторяющееся</TagText>
          </Tag>
        </TagsContainer>
      </>
    </Root>
  )
}

export const AppointmentCard = React.memo(AppointmentCardUnmemoized)
