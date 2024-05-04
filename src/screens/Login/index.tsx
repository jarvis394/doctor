import { Button } from '@components/Button'
import Input from '@components/Input'
import Screen from '@components/Screen'
import LoginIllustration from '@components/svg/LoginIllustration'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useState } from 'react'

const Root = styled.View({
  display: 'flex',
  gap: 32,
  width: '100%',
  padding: 32,
  alignItems: 'center',
  flexGrow: 1,
  paddingTop: 128,
})

const Content = styled.View({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  width: '100%',
})

const Block = styled.View({
  display: 'flex',
  gap: 8,
  width: '100%',
})

const Illustration = styled(LoginIllustration)({
  width: '100%',
})

const LoginScreen: React.FC<StackNavigationProps<'LoginScreen'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleGoToRegister = () => {
    navigation.push('RegisterScreen')
  }

  const handleLogin = () => {
    console.log(email, password)
    navigation.push('App')
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  return (
    <Screen>
      <Root>
        <Illustration />
        <Content>
          <Block>
            <Input
              onChangeText={handleEmailChange}
              placeholder="Электронная почта"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <Input
              onChangeText={handlePasswordChange}
              placeholder="Пароль"
              textContentType="password"
              secureTextEntry
            />
          </Block>
          <Block>
            <Button mode="contained-tonal" onPress={handleGoToRegister}>
              Регистрация
            </Button>
            <Button mode="contained" onPress={handleLogin}>
              Войти
            </Button>
          </Block>
        </Content>
      </Root>
    </Screen>
  )
}

export default LoginScreen
