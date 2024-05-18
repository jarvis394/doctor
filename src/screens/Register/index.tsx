import Input from '@components/Input'
import { Button } from '@components/Button'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { Dialog, Portal, Text, Button as PaperButton } from 'react-native-paper'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '@config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { setIsAuthLoading, setIsLoggedIn, setUserData } from '@store/auth'
import { useAppDispatch } from '@store/index'

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
  const [errorText, setErrorText] = useState<string>('')
  const [visible, setVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useAppDispatch()

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const handleGoToLogin = () => {
    navigation.push('LoginScreen')
  }

  const handleRegister = () => {
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          avatarUrl: null,
        }
        const usersRef = doc(firestore, 'users', uid)
        await setDoc(usersRef, data)
        setIsLoading(false)

        dispatch(
          setUserData({
            id: response.user.uid,
            avatarUrl: response.user.photoURL,
          })
        )
        dispatch(setIsLoggedIn(true))
        dispatch(setIsAuthLoading(false))

        navigation.push('App')
      })
      .catch((error) => {
        setIsLoading(false)

        if (error.code === 'auth/email-already-in-use') {
          setErrorText('That email address is already in use!')
          showDialog()
        }

        if (error.code === 'auth/invalid-email') {
          setErrorText('That email address is invalid!')
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
            <Button
              mode="contained"
              disabled={isLoading}
              loading={isLoading}
              onPress={handleRegister}
            >
              Зарегистрироваться
            </Button>
            <Button mode="text" onPress={handleGoToLogin}>
              У меня уже есть аккаунт
            </Button>
          </Block>
        </Content>
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
      </Root>
    </Screen>
  )
}

export default RegisterScreen
