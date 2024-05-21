import { Button } from '@components/Button'
import { ChatCard } from '@components/ChatCard'
import Screen from '@components/Screen'
import Section from '@components/Section'
import Stars from '@components/svg/Stars'
import styled from '@emotion/native'
import { BottomTabNavigationProps } from '@routes/app.routes'
import React, {useEffect} from 'react'
import { Text } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Chat } from 'src/types/Chat'
import {useAppDispatch, useAppSelector} from "@store/index";
import {fetchChats, getChats} from "@store/chats";

// todo: remove
export const CHAT_TEST_DATA: Chat[] = [
  {
    dateStarted: Date.now(),
    lastUpdated: Date.now(),
    id: '1',
    isWaitingForAssistantResponse: false,
    history: [
      {
        id: '1',
        isAssistant: false,
        isUser: true,
        text: 'Как сказать врачу, что мне больно?',
        timestamp: Date.now(),
        userId: '1',
      },
      {
        id: '2',
        isAssistant: true,
        isUser: false,
        text: 'В зимний период, во время такого сезона, многие из нас сталкиваются с проблемой сухой кожи, насморка, першения в горле, кашля и покраснения лица, особенно у детей. Температура воздуха в отапливаемых',
        timestamp: Date.now(),
      },
    ],
  },
  {
    dateStarted: Date.now(),
    lastUpdated: Date.now(),
    id: '2',
    isWaitingForAssistantResponse: true,
    history: [
      {
        id: '3',
        isAssistant: false,
        isUser: true,
        text: 'Болит зуб сверху посередине',
        timestamp: Date.now(),
        userId: '1',
      },
    ],
  },
]

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
  const data = CHAT_TEST_DATA
  const handleCreateChat = () => {
    console.log(chats)
    navigation.push('AssistantChatScreen', {
      create: true,
    })
  }

  const chats = useAppSelector(getChats)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])

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
        {data.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </Section>
    </Screen>
  )
}

export default AssistantScreen
