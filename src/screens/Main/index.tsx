import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BottomTabNavigationProps } from '@routes/app.routes'
import styled from '@emotion/native'
import { AppointmentCard } from '@components/AppointmentCard'
import Section from '@components/Section'
import { ScrollView } from 'react-native'
import { ActionButton } from '@components/ActionButton'
import AddVisitIcon from '@assets/icons/AddVisit'
import MedicalInformationIcon from '@assets/icons/Medicalnformation'
import TipsAndUpdatesIcon from '@assets/icons/TipsAndUpdates'

const Root = styled(ScrollView)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  maxHeight: '100%',
  flex: 1,
  paddingBottom: 16,
})

const ButtonGrid = styled.View`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`

const MainScreen: React.FC<BottomTabNavigationProps<'MainScreen'>> = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Root>
        <Section title="Действия">
          <ButtonGrid>
            <ActionButton
              onPress={() => {
                console.log('active')
              }}
            >
              <AddVisitIcon />
              <div>Добавить посещение</div>
            </ActionButton>
            <ActionButton
              onPress={() => {
                console.log('active')
              }}
            >
              <TipsAndUpdatesIcon />
              <div>Помощь AI-асистента</div>
            </ActionButton>
            <ActionButton
              onPress={() => {
                console.log('active')
              }}
            >
              <MedicalInformationIcon />
              <div> Карточки врачей</div>
            </ActionButton>
          </ButtonGrid>
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
