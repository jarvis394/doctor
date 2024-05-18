import React from 'react'
import styled from '@emotion/native'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProps } from '@routes/app.routes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@store/index'
import {
  getCurrentEditingAppointment,
  setCurrentEditingAppointment,
} from '@store/appointments'
import { getDoctorReferencePath } from '@utils/getDoctorReferencePath'
import { getUser } from '@store/auth'

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
})

const Title = styled(Text)({
  fontSize: 13,
  fontWeight: '500',
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 18,
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
  flexShrink: 1,
  fontFamily: 'GoogleSans-Medium',
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

type DoctorCardProps = {
  withHeader?: boolean
  editMode?: boolean
  doctorId: string
}

const DoctorCardUnmemoized: React.FC<DoctorCardProps> = ({
  editMode,
  withHeader,
  doctorId,
}) => {
  const user = useAppSelector(getUser)
  const doctor = useAppSelector((state) =>
    state.doctors.data.find((e) => e.id === doctorId)
  )
  const theme = useAdaptiveTheme()
  const dispatch = useAppDispatch()
  const currentEditingAppointment = useAppSelector(getCurrentEditingAppointment)
  const navigation = useNavigation<BottomTabNavigationProps['navigation']>()

  const handlePress = () => {
    if (editMode) {
      if (!currentEditingAppointment) return
      if (!user) return
      const editedAppointment = {
        ...currentEditingAppointment,
        doctor: getDoctorReferencePath(user.id, doctorId),
      }
      dispatch(setCurrentEditingAppointment(editedAppointment))
      return navigation.pop()
    }

    navigation.push('AddDoctorScreen')
  }

  if (!doctor) return

  return (
    <Root borderless onPress={handlePress}>
      <>
        {withHeader && (
          <TitleContainer elevation={1} mode="flat">
            <Title>Карточка врача</Title>
          </TitleContainer>
        )}
        <Content elevation={2} mode="flat">
          <InfoContainer>
            {doctor.avatarUrl && <Avatar source={{ uri: doctor.avatarUrl }} />}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Name>
                {doctor.lastName} {doctor.firstName} {doctor.middleName}
              </Name>
              <JobTitle>{doctor.speciality}</JobTitle>
            </View>
            <ListContainer>
              <ListItem>
                <FeatherIcons
                  color={theme.colors.text}
                  name="map-pin"
                  size={16}
                />
                <SecondaryText>{doctor.workplace}</SecondaryText>
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
