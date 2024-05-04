import React from 'react'
import { Button } from '@components/Button'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import Screen from '@components/Screen'

const Root = styled(Screen)({
  padding: 16,
})

const AppointmentScreen: React.FC<
  StackNavigationProps<'AppointmentScreen'>
> = ({ navigation }) => {
  return (
    <Root>
      <Button
        onPress={() => {
          navigation.popToTop()
        }}
      >
        Назад
      </Button>
    </Root>
  )
}

export default AppointmentScreen
