import React from 'react'
import { BottomTabNavigationProps } from '@routes/app.routes'
import styled from '@emotion/native'
import { AppointmentCard } from '@components/AppointmentCard'
import Section from '@components/Section'
import { Text } from 'react-native-paper'
import Screen from '@components/Screen'

const Root = styled(Screen)({
  gap: 12,
})

const MainScreen: React.FC<BottomTabNavigationProps<'MainScreen'>> = () => {
  return (
    <Root>
      <Section title="Действия">
        <Text variant="bodyLarge">TODO</Text>
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
