import { Button } from '@components/Button'
import Input from '@components/Input'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { Text } from 'react-native-paper'
// import auth from '@react-native-firebase/auth'

const Root = styled.View({
  display: 'flex',
  gap: 32,
  width: '100%',
  padding: 32,
  alignItems: 'center',
  flexGrow: 1,
  paddingTop: 128,
})

const HeroContainer = styled.View({
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  width: '100%',
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

const HeroTitle = styled(Text)({
  fontFamily: 'GoogleSans-Bold',
  fontSize: 32,
  textAlign: 'center',
})

const HeroSubtitle = styled(Text)({
  fontFamily: 'GoogleSans-Regular',
  fontSize: 15,
  textAlign: 'center',
  opacity: 0.63,
  lineHeight: 21,
})

const RegisterScreen: React.FC<StackNavigationProps<'RegisterScreen'>> = ({
  navigation,
}) => {
  const theme = useAdaptiveTheme()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleGoToLogin = () => {
    navigation.push('LoginScreen')
  }

  const handleRegister = () => {
    console.log(email, password)

    navigation.push('App')

    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log('User account created & signed in!')
    //     navigation.push('App')
    //   })
    //   .catch((error) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!')
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!')
    //     }

    //     console.error(error)
    //   })
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  return (
    <Screen safeAreaWithBottomEdge>
      <Root>
        <HeroContainer>
          <LinearGradient
            style={{ width: 96, height: 96, borderRadius: 100 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[theme.colors.primaryContainer, '#E1E1E1']}
          />
          <Block>
            <HeroTitle>Давайте начнем.</HeroTitle>
            <HeroSubtitle>
              Зарегистрируйтесь и получите доступ к ведению посещений и к AI
              ассистенту
            </HeroSubtitle>
          </Block>
        </HeroContainer>
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
              placeholder="Придумайте пароль"
              textContentType="password"
              secureTextEntry
            />
          </Block>
          <Block>
            <Button mode="contained" onPress={handleRegister}>
              Зарегистрироваться
            </Button>
            <Button mode="contained-tonal" onPress={handleGoToLogin}>
              Авторизация
            </Button>
          </Block>
        </Content>
      </Root>
    </Screen>
  )
}

export default RegisterScreen
