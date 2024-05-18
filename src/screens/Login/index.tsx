import Input from '@components/Input'
import { Button } from '@components/Button'
import Screen from '@components/Screen'
import LoginIllustration from '@components/svg/LoginIllustration'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useState } from 'react'
import { Portal, Dialog, Text, Button as PaperButton } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@config/firebase'
import { setIsAuthLoading, setIsLoggedIn, setUserData } from '@store/auth'
import { useAppDispatch } from '@store/index'

const Root = styled.View({
  display: 'flex',
  gap: 32,
  width: '100%',
  padding: 32,
  alignItems: 'center',
  flexGrow: 1,
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
  const [errorText, setErrorText] = useState<string>('')
  const [visible, setVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useAppDispatch()

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const handleGoToRegister = () => {
    navigation.push('RegisterScreen')
  }

  const handleLogin = () => {
    console.log(email, password)

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setIsLoading(false)

        console.log('User account signed in!', data)
        navigation.push('App')

        dispatch(
          setUserData({
            id: data.user.uid,
            avatarUrl: data.user.photoURL,
          })
        )
        dispatch(setIsLoggedIn(true))
        dispatch(setIsAuthLoading(false))
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-credential') {
          setErrorText('You have entered wrong credentials. Please, try again.')
          showDialog()
        }

        if (error.code === 'auth/user-disabled') {
          setErrorText('User disabled')
          showDialog()
        }
      })
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  return (
    <Screen safeAreaProps={{ edges: ['bottom', 'left', 'right'] }}>
      <Root>
        <Illustration />
        <Content>
          <Block>
            <Input
              onChangeText={handleEmailChange}
              placeholder="Электронная почта"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              onChangeText={handlePasswordChange}
              placeholder="Пароль"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry
            />
          </Block>
          <Block>
            <Button
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              onPress={handleLogin}
            >
              Войти
            </Button>
            <Button mode="text" onPress={handleGoToRegister}>
              У меня нет аккаунта
            </Button>
          </Block>
        </Content>
      </Root>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{errorText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton mode="text" onPress={hideDialog}>
              Хорошо
            </PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Screen>
  )
}

export default LoginScreen
