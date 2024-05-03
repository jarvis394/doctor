import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@components/Button'
import styled from '@emotion/native'
import { Text } from 'react-native-paper'
import { theme } from '@config/theme'
import { StackNavigationProps } from '@routes'
import RegisterCircle from '@assets/svg/RegisterCircle'
import ValidationIndicatorImage from '@assets/svg/ValidationIndicator'
import ValidationIndicatorActiveImage from '@assets/svg/ValidationIndicatorActive'

const Root = styled.View({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

const Header = styled.View({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: '70px',
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

const ListContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
})
const ListItem = styled.View({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const ValidationText = styled(Text)({
  fontSize: 12,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Regular',
  lineHeight: 6,
  marginLeft: '10px',
  color: theme.colors.surfaceVariant,
})

const HeaderTitle = styled(Text)({
  fontSize: 24,
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 31,
  flexGrow: 1,
  paddingTop: 16,
  paddingLeft: 16,
  userSelect: 'none',
})

const RegisterScreen: React.FC<StackNavigationProps<'RegisterScreen'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <Header>
        <RegisterCircle />
        <HeaderTitle style={{ textAlign: 'center' }}>
          Давайте начнем
        </HeaderTitle>
        <InputText style={{ textAlign: 'center' }}>
          Зарегистрируйтесь и получите доступ к ведению посещений и к AI
          ассистенту
        </InputText>
      </Header>
      <Root>
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
          <InputText>Придумайте пароль</InputText>
        </Button>
        <ListContainer>
          <ListItem>
            <ValidationIndicatorActiveImage />
            <ValidationText>Больше 6 символов</ValidationText>
          </ListItem>
          <ListItem>
            <ValidationIndicatorImage />
            <ValidationText>
              Хотя бы одна цифра или специальный символ
            </ValidationText>
          </ListItem>
        </ListContainer>

        <Button
          onPress={() => {
            navigation.push('App')
          }}
          style={{ backgroundColor: theme.colors.inversePrimary }}
        >
          <ButtonText>Продолжить</ButtonText>
        </Button>
        <Button
          onPress={() => {
            navigation.push('LoginScreen')
          }}
          style={{ backgroundColor: '#1f1f1f' }}
        >
          <ButtonText>Авторизация</ButtonText>
        </Button>
      </Root>
    </SafeAreaView>
  )
}

export default RegisterScreen
