import React, { useState } from 'react'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import Screen from '@components/Screen'
import { useAppSelector } from '@store/index'
import { Text } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import dayjs from 'dayjs'
import { DoctorCard } from '@components/DoctorCard'
import Section from '@components/Section'
import { Button } from '@components/Button'
import { View } from 'react-native'
import Input from '@components/Input'
import tinycolor from 'tinycolor2'
import { FilePicker } from '@components/FilePicker'

const Root = styled(Screen)({})

const InfoContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 16,
  paddingBottom: 0,
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

const AppointmentScreen: React.FC<
  StackNavigationProps<'AppointmentScreen'>
> = ({ navigation, route }) => {
  const theme = useAdaptiveTheme()
  const appointment = useAppSelector((state) =>
    state.appointments.data.find((e) => e.id === route.params.id)
  )
  const formattedTime = dayjs(appointment?.time).format('D MMMM, YYYY HH:mm')
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [comment, setComment] = useState(appointment?.comment || '')
  const [files, setFiles] = useState(appointment?.files || [])
  const [isEditingFiles, setIsEditingFiles] = useState(false)

  const handleCommentEdit = () => {
    setIsEditingComment((prev) => !prev)
  }

  const handleFilesEdit = () => {
    setIsEditingFiles((prev) => !prev)
  }

  const handleEditAppointment = () => {
    navigation.push('EditAppointmentScreen', { id: route.params.id })
  }

  console.log(appointment)

  if (!appointment) {
    navigation.pop()
    return null
  }

  return (
    <Root
      safeAreaProps={{ edges: ['left', 'right', 'bottom'], style: { gap: 16 } }}
    >
      <InfoContainer>
        <Title>{appointment.title}</Title>
        <ListContainer>
          <ListItem>
            <FeatherIcons color={theme.colors.text} name="map-pin" size={16} />
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
      {appointment.doctor && (
        <View style={{ padding: 16, paddingVertical: 0 }}>
          <DoctorCard withHeader doctorId={appointment.doctor.id} />
        </View>
      )}
      <Section title="Комментарий">
        {isEditingComment && (
          <Input
            style={{ textAlignVertical: 'top', maxHeight: 160 }}
            multiline
            onChangeText={(text) => setComment(text)}
            numberOfLines={4}
            defaultValue={comment}
          />
        )}
        {!isEditingComment && comment && (
          <Text variant="bodyLarge">{comment}</Text>
        )}
        {!isEditingComment && !comment && (
          <Text
            variant="bodyLarge"
            style={{
              fontStyle: 'italic',
              color: tinycolor(theme.colors.onSecondaryContainer)
                .setAlpha(0.63)
                .toRgbString(),
            }}
          >
            Нет комментария
          </Text>
        )}
        <Button
          mode="contained-tonal"
          onPress={handleCommentEdit}
          icon={(props) =>
            !isEditingComment && (
              <MaterialIcons {...props} size={20} name="mode-edit" />
            )
          }
        >
          {isEditingComment ? 'Сохранить' : 'Редактировать'}
        </Button>
      </Section>
      <Section contentProps={{ style: { paddingHorizontal: 0 } }} title="Файлы">
        <FilePicker isEditing={isEditingFiles} />
      </Section>
      <View style={{ paddingHorizontal: 16, gap: 12, display: 'flex' }}>
        <Button mode="contained-tonal" onPress={handleFilesEdit}>
          Редактировать файлы
        </Button>
        <Button mode="text" onPress={handleEditAppointment}>
          Редактировать посещение
        </Button>
      </View>
    </Root>
  )
}

export default AppointmentScreen
