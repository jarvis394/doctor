import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@components/Button'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import Section from '@components/Section'
import DoorImage from '@assets/svg/Door'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { Text } from 'react-native-paper'
import { theme } from '@config/theme'
import GoogleImage from '@assets/svg/Google'
import AppleImage from '@assets/svg/Apple'

const Root = styled.View({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

const ButtonText = styled(Text)({
  fontSize: 15,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 19,
})

const InputText = styled(Text)({
  fontSize: 15,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 19,
  color: theme.colors.surfaceVariant,
})

const Flex = styled.View({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between'
})

const LoginScreen: React.FC<StackNavigationProps<'LoginScreen'>> = ({
  navigation,
}) => {
  const theme = useAdaptiveTheme()
  return (
    <SafeAreaView>
      <Root>
        <Section title="Вход в аккаунт" />
        <DoorImage />
        <Button
          onPress={() => {
            navigation.push('App')
          }}
          style={{ backgroundColor: theme.colors.elevation.level2 }}
        >
          <Flex>
            <GoogleImage />
            <ButtonText>Войти через Google</ButtonText>
          </Flex>
        </Button>
        <Button
          onPress={() => {
            navigation.push('App')
          }}
          style={{ backgroundColor: '#000', borderColor: '#FFFFFF' }}
        >
          <Flex>
            <AppleImage />
            <ButtonText>Войти через Apple</ButtonText>
          </Flex>
        </Button>
        <Button
          onPress={() => {}}
          style={{ backgroundColor: theme.colors.elevation.level2 }}
        >
          <InputText>Электронная почта</InputText>
        </Button>
        <Button
          onPress={() => {}}
          style={{ backgroundColor: theme.colors.elevation.level2 }}
        >
          <InputText>Пароль</InputText>
        </Button>
        <Button
          onPress={() => {
            navigation.push('RegisterScreen')
          }}
          style={{ backgroundColor: '#1f1f1f' }}
        >
          <ButtonText>Регистрация</ButtonText>
        </Button>
        <Button
          onPress={() => {
            navigation.push('App')
          }}
          style={{ backgroundColor: theme.colors.inversePrimary }}
        >
          <ButtonText>Войти</ButtonText>
        </Button>
      </Root>
    </SafeAreaView>
  )
}

export default LoginScreen
