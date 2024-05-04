import React from 'react'
import { DoctorCard } from '@components/DoctorCard'
import { StackNavigationProps } from '@routes'
import { Button } from '@components/Button'
import Section from '@components/Section'
import Screen from '@components/Screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'react-native-paper'
import Input from '@components/Input'
import styled from '@emotion/native'

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
> = () => {
  return (
    <Screen
      safeAreaProps={{ edges: ['left', 'right', 'bottom'], style: { gap: 12 } }}
    >
      <Section>
        <Input placeholder={'Название посещения'} />
        <DoctorCard />
        <Button
          mode="contained-tonal"
          icon={(props) => <MaterialIcons {...props} size={20} name="person" />}
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
    </Screen>
  )
}

export default AddAppointmentScreen
