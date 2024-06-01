import React, { useMemo } from 'react'
import styled from '@emotion/native'
import {
  ActivityIndicator,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProps } from '@routes/app.routes'
import dayjs from 'dayjs'
import { Chat } from 'src/types/Chat'

const Root = styled(TouchableRipple)({
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  userSelect: 'none',
})

const Header = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 14,
  paddingHorizontal: 16,
})

const Content = styled(Surface)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  padding: 16,
  gap: 8,
})

const ChatPreviewContainer = styled.View({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  flex: 1,
})

const Title = styled(Text)({
  fontSize: 20,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Medium',
  lineHeight: 25,
})

const Message = styled.View({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

const ChatMessage = styled(Text)(({ theme }) => ({
  fontSize: 13,
  fontWeight: '400',
  fontFamily: 'GoogleSans-Regular',
  color: theme.colors.text,
}))

const UserPrefix = styled(ChatMessage)(({ theme }) => ({
  color: theme.colors.primary,
  fontFamily: 'GoogleSans-Medium',
}))

const AssistantPrefix = styled(ChatMessage)(({ theme }) => ({
  color: theme.colors.secondary,
  fontFamily: 'GoogleSans-Medium',
}))

type ChatCardProps = {
  chat: Chat
}

const ChatCardUnmemoized: React.FC<ChatCardProps> = ({ chat }) => {
  const theme = useAdaptiveTheme()
  const navigation = useNavigation<BottomTabNavigationProps['navigation']>()
  const timestampText = useMemo(
    () => dayjs(chat.dateStarted).format('D MMMM, YYYY HH:mm'),
    [chat.dateStarted]
  )
  const historyItems = useMemo(() => {
    const lastTwoMessages = chat.history.slice(-2)

    return lastTwoMessages.map((e) => {
      if (e.isUser) {
        return (
          <Message key={e.id}>
            <UserPrefix>Вы</UserPrefix>
            <ChatMessage numberOfLines={2}>{e.text}</ChatMessage>
          </Message>
        )
      } else if (e.isAssistant) {
        return (
          <Message key={e.id}>
            <AssistantPrefix>Ассистент</AssistantPrefix>
            <ChatMessage numberOfLines={2}>{e.text}</ChatMessage>
          </Message>
        )
      }

      return null
    })
  }, [chat.history])

  const handlePress = () => {
    navigation.push('AssistantChatScreen', { chatId: chat.id })
  }

  return (
    <Root borderless onPress={handlePress}>
      <>
        <Header elevation={2} mode="flat">
          <Title>{timestampText}</Title>
          <MaterialIcons
            color={theme.colors.text}
            name="chevron-right"
            size={24}
          />
        </Header>
        <Content elevation={1} mode="flat">
          <ChatPreviewContainer>{historyItems}</ChatPreviewContainer>
          {chat.isWaitingForAssistantResponse && (
            <ActivityIndicator color={theme.colors.secondary} size={16} />
          )}
        </Content>
      </>
    </Root>
  )
}

export const ChatCard = React.memo(ChatCardUnmemoized)
