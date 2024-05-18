import React, { useEffect } from 'react'
import { BottomTabNavigationProps } from '@routes/app.routes'
import styled from '@emotion/native'
import { AppointmentCard } from '@components/AppointmentCard'
import Section from '@components/Section'
import Screen from '@components/Screen'
import ActionButton from './ActionButton'
import { useAppDispatch, useAppSelector } from '@store/index'
import { fetchAppointments, getAppointments } from '@store/appointments'

const Root = styled(Screen)({
  gap: 12,
})

const MainScreen: React.FC<BottomTabNavigationProps<'MainScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const appointments = useAppSelector(getAppointments)

  const handleAddAppointment = () => {
    navigation.push('AddAppointmentScreen')
  }

  const handleGoToAssistant = () => {
    navigation.jumpTo('AssistantScreen')
  }

  const handleGoToDoctors = () => {
    navigation.push('SelectDoctorScreen')
  }

  useEffect(() => {
    dispatch(fetchAppointments())
  }, [dispatch])

  console.log(appointments)

  return (
    <Root>
      <Section
        contentProps={{
          style: { flexWrap: 'wrap', gap: 8 },
        }}
        title="Действия"
      >
        <ActionButton
          icon="add"
          title="Добавить посещение"
          variant="primary"
          onPress={handleAddAppointment}
        />
        <ActionButton
          icon="tips-and-updates"
          title="Помощь AI-ассистента"
          variant="gradient"
          onPress={handleGoToAssistant}
        />
        <ActionButton
          icon="medical-information"
          title="Карточки врачей"
          variant="default"
          onPress={handleGoToDoctors}
        />
      </Section>
      <Section
        onPress={() => {
          console.log('AppointmentsScreen')
        }}
        title="Предстоящие визиты"
      >
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </Section>
      <Section
        onPress={() => {
          console.log('AppointmentsScreen')
        }}
        title="История визитов"
      >
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </Section>
    </Root>
  )
}

export default MainScreen
