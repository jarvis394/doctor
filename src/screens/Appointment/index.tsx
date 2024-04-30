import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@components/Button'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'

const Root = styled.View({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

const AppointmentScreen: React.FC<
  StackNavigationProps<'AppointmentScreen'>
> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Root>
        <Button
          onPress={() => {
            navigation.popToTop()
          }}
        >
          Назад
        </Button>
      </Root>
    </SafeAreaView>
  )
}

export default AppointmentScreen
