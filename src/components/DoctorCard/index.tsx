import React from 'react'
import styled from '@emotion/native'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProps } from '@routes/app.routes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Root = styled(TouchableRipple)({
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  userSelect: 'none',
})

const Content = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 14,
  paddingHorizontal: 16,
  backgroundColor: '#1F1F1F',
})

const Avatar = styled.Image({
  backgroundColor: 'grey',
  height: 64,
  width: 64,
  borderRadius: 16,
})

const TitleContainer = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  gap: 6,
  backgroundColor: '#171717',
})

const Title = styled(Text)({
  fontSize: 13,
  fontWeight: '500',
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 25,
  opacity: 0.63,
})

const InfoContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '90%',
})

const ListContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

const Name = styled(Text)({
  fontSize: 20,
  fontWeight: '400',
  maxWidth: '80%',
  wordWrap: 'break-word',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 25,
})

const JobTitle = styled(Text)({
  fontSize: 13,
  fontWeight: '500',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 25,
  opacity: 0.63,
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

const SideDiv = styled.View({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
})

const DoctorCardUnmemoized: React.FC = () => {
  const theme = useAdaptiveTheme()
  const navigation = useNavigation<BottomTabNavigationProps['navigation']>()

  const handlePress = () => {
    navigation.push('AppointmentScreen', { id: '1' })
  }

  return (
    <Root onPress={handlePress}>
      <>
        <TitleContainer elevation={1} mode="flat">
          <Title>Карточка врача</Title>
        </TitleContainer>
        <Content elevation={2} mode="flat">
          <InfoContainer>
            <Avatar />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Name>Небудчикова Елизавета Николаевна</Name>
              <JobTitle>Стоматолог-терапевт</JobTitle>
            </div>
            <ListContainer>
              <ListItem>
                <FeatherIcons
                  color={theme.colors.text}
                  name="map-pin"
                  size={16}
                />
                <SecondaryText>MEDI, пр. Металлистов, 9</SecondaryText>
              </ListItem>
            </ListContainer>
          </InfoContainer>
          <SideDiv>
            <MaterialIcons
              color={theme.colors.text}
              name="chevron-right"
              size={24}
            />
          </SideDiv>
        </Content>
      </>
    </Root>
  )
}

export const DoctorCard = React.memo(DoctorCardUnmemoized)