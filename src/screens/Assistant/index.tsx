import { Button } from '@components/Button'
import { ChatCard } from '@components/ChatCard'
import Screen from '@components/Screen'
import Section from '@components/Section'
import Stars from '@components/svg/Stars'
import styled from '@emotion/native'
import { BottomTabNavigationProps } from '@routes/app.routes'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppDispatch, useAppSelector } from '@store/index'
import { fetchChats, getChats } from '@store/chats'

const HeaderContainer = styled.View({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: 16,
  paddingTop: 32,
})

const HeaderTitle = styled(Text)({
  fontFamily: 'GoogleSans-Medium',
  fontSize: 24,
  fontWeight: '400',
  lineHeight: 32,
  textAlign: 'center',
  position: 'relative',
})

const HeaderSubtitle = styled(Text)({
  fontFamily: 'GoogleSans-Regular',
  fontSize: 16,
  fontWeight: '400',
  lineHeight: 20,
  textAlign: 'center',
})

const StarsSVG = styled(Stars)({
  position: 'absolute',
  zIndex: 1,
  right: -12,
  top: -2,
})

const HeaderTitleContainer = styled.View({
  width: 'auto',
  position: 'relative',
})

const AssistantScreen: React.FC<
  BottomTabNavigationProps<'AssistantScreen'>
> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(getChats)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    dispatch(fetchChats(() => {setLoading(false)}))
  }, [dispatch])

  const handleCreateChat = () => {
    navigation.push('AssistantChatScreen', { create: false })
  }

  return (
    <Screen>
      <HeaderContainer>
        <HeaderTitleContainer>
          <HeaderTitle>Ассистент</HeaderTitle>
          <StarsSVG id="stars_gradient_assistant_chat" />
        </HeaderTitleContainer>
        <HeaderSubtitle>Личный помощник в медицинских делах</HeaderSubtitle>
      </HeaderContainer>
      <Section title="Чаты">
        <Button
          mode="contained-tonal"
          onPress={handleCreateChat}
          icon={(props) => <MaterialIcons {...props} size={20} name="add" />}
        >
          Создать чат
        </Button>
        {loading && <ActivityIndicator animating={true} />}
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </Section>
    </Screen>
  )
}

export default AssistantScreen
