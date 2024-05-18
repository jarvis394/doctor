import React, { useState } from 'react'
import { DoctorCard } from '@components/DoctorCard'
import { StackNavigationProps } from '@routes'
import { Button } from '@components/Button'
import Section from '@components/Section'
import Screen from '@components/Screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'react-native-paper'
import Input from '@components/Input'
import styled from '@emotion/native'
import { createAppointment, getAppointmentsState } from '@store/appointments'
import { Appointment } from 'src/types/Appointment'
import { useAppDispatch, useAppSelector } from '@store/index'
import { FetchingState } from 'src/types/FetchingState'
import { Doctor } from 'src/types/Doctor'

const TagsContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
})

const TagContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.card,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
}))

const TagText = styled.Text({
  color: '#fff',
})

const AddAppointmentScreen: React.FC<
  StackNavigationProps<'AddAppointmentScreen'>
> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(getAppointmentsState)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDoctor, _setSelectedDoctor] = useState<Doctor | null>(null)

  const handleAddAppointment = () => {
    const newAppointment: Appointment = {
      id: '',
      title: 'New Appointment',
      time: Date.now(),
      place: 'Test Place',
      doctor: {} as Doctor,
      tags: [],
    }
    dispatch(createAppointment(newAppointment))
  }

  return (
    <Screen
      safeAreaProps={{ edges: ['left', 'right', 'bottom'], style: { gap: 12 } }}
    >
      <Section>
        <Input placeholder={'Название посещения'} />
        {selectedDoctor && <DoctorCard doctor={selectedDoctor} withHeader />}
        <Button
          mode="contained-tonal"
          icon={(props) => <MaterialIcons {...props} size={20} name="person" />}
          onPress={() => navigation.push('SelectDoctorScreen')}
        >
          Выбор врача
        </Button>
      </Section>
      <Section title="Теги">
        <TagsContainer>
          <TagContainer>
            <TagText>Повторяющееся</TagText>
          </TagContainer>
          <TagContainer>
            <TagText>Визит</TagText>
          </TagContainer>
          <TagContainer>
            <TagText>Консультация</TagText>
          </TagContainer>
        </TagsContainer>
      </Section>
      <Section title="Время и место">
        <Input placeholder={'Название места'} />
        <Text>Выбор времени</Text>
      </Section>
      <Button
        mode="contained"
        loading={state === FetchingState.PENDING}
        disabled={state === FetchingState.PENDING}
        onPress={handleAddAppointment}
      >
        Сохранить
      </Button>
    </Screen>
  )
}

export default AddAppointmentScreen
