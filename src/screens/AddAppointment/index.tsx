import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from '@emotion/native'
import { Appbar } from 'react-native-paper'
import { ScrollView } from 'react-native'
import Searchbar from '@components/Searchbar'
import { DoctorCard } from '@components/DoctorCard'
import { StackNavigationProps } from '@routes'
import { Button } from '@components/Button'
import Section from '@components/Section'
import Tags from '@components/Tags'

const Root = styled(ScrollView)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  maxHeight: '100%',
  flex: 1,
})

const AddAppointmentScreen: React.FC<
  StackNavigationProps<'AddAppointmentScreen'>
> = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <Root>
        <Appbar.Header style={{ backgroundColor: '#000' }}>
          <Appbar.BackAction />
          <Appbar.Content title="Добавить посещение" />
        </Appbar.Header>
        <Section>
          <Searchbar title={'Название посещения'} />
          <DoctorCard />
          <Button style={{ opacity: 0.7 }}>Выбор врача</Button>
        </Section>
        <Section title="Теги">
          <Tags />
        </Section>
        <Section title="Время и место">
          <Searchbar title={'Название места'} />
          <div>Выбор времени</div>
        </Section>
      </Root>
    </SafeAreaView>
  )
}

export default AddAppointmentScreen
