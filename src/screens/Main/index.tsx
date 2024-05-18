import React from 'react'
import { BottomTabNavigationProps } from '@routes/app.routes'
import styled from '@emotion/native'
import { AppointmentCard } from '@components/AppointmentCard'
import Section from '@components/Section'
import Screen from '@components/Screen'
import ActionButton from './ActionButton'
import { FilePicker } from '@components/FilePicker'

const Root = styled(Screen)({
  gap: 12,
})

const MainScreen: React.FC<BottomTabNavigationProps<'MainScreen'>> = ({
  navigation,
}) => {
  const handleAddAppointment = () => {
    navigation.push('AddAppointmentScreen')
  }

  const handleGoToAssistant = () => {
    navigation.jumpTo('AssistantScreen')
  }

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
        {/* <ActionButton
          icon="medical-information"
          title="Карточки врачей"
          variant="default"
          onPress={handleAddAppointment}
        /> */}
      </Section>
      <Section
        onPress={() => {
          console.log('AppointmentsScreen')
        }}
        title="Предстоящие визиты"
      >
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </Section>
    </Root>
  )
}

export default MainScreen
