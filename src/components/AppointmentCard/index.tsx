import React from 'react'
import styled from '@emotion/native'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes'
import { Appointment, AppointmentTag } from 'src/types/Appointment'
import dayjs from 'dayjs'
import exhaustivnessCheck from '@utils/exhaustivnessCheck'

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

export const tagToTagName = (tag: AppointmentTag) => {
  switch (tag) {
    case AppointmentTag.RECURRING:
      return 'Повторяющееся'
    case AppointmentTag.CONSULTATION:
      return 'Консультация'
    case AppointmentTag.ONE_TIME_VISIT:
      return 'Визит'
    default:
      exhaustivnessCheck(tag)
  }
}

type AppointmentCardProps = {
  appointment: Appointment
}

const AppointmentCardUnmemoized: React.FC<AppointmentCardProps> = ({
  appointment,
  ...props
}) => {
  const theme = useAdaptiveTheme()
  const navigation = useNavigation<StackNavigationProps['navigation']>()
  const formattedTime = dayjs(appointment.time).format('D MMMM, YYYY HH:mm')

  const handlePress = () => {
    navigation.push('AppointmentScreen', { id: appointment.id })
  }

  return (
    <Root {...props} key={appointment.id} borderless onPress={handlePress}>
      <>
        <Content elevation={2} mode="flat">
          <InfoContainer>
            <Title>{appointment.title}</Title>
            <ListContainer>
              <ListItem>
                <FeatherIcons
                  color={theme.colors.text}
                  name="map-pin"
                  size={16}
                />
                <SecondaryText>{appointment.place}</SecondaryText>
              </ListItem>
              <ListItem>
                <MaterialIcons
                  color={theme.colors.text}
                  name="access-time"
                  size={16}
                />
                <SecondaryText>{formattedTime}</SecondaryText>
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
          {appointment.tags.map((tag, i) => (
            <Tag key={i}>
              <TagText>{tagToTagName(tag)}</TagText>
            </Tag>
          ))}
        </TagsContainer>
      </>
    </Root>
  )
}

export const AppointmentCard = React.memo(AppointmentCardUnmemoized)
