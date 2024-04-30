import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomTabNavigationProps } from '@routes/app.routes'
import styled from '@emotion/native'
import { AppointmentCard } from '@components/AppointmentCard'
import Section from '@components/Section'
import { Text } from 'react-native-paper'
import { ScrollView } from 'react-native'

const Root = styled(ScrollView)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  maxHeight: '100%',
  flex: 1,
  paddingBottom: 16,
})

const MainScreen: React.FC<BottomTabNavigationProps<'MainScreen'>> = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
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
    </SafeAreaView>
  )
}

export default MainScreen
