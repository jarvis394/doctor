import styled from '@emotion/native'
import { useAdaptiveTheme } from '@hooks/useAdaptiveTheme'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { ChatMessage as IChatMessage } from 'src/types/ChatMessage'
import tinycolor from 'tinycolor2'

type ChatMessageProps = {
  message: IChatMessage
}

const ChatMessageContainer = styled.View({
  display: 'flex',
  flexDirection: 'row',
})

const Root = styled.View({
  overflow: 'hidden',
  gap: 0,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '75%',
  borderRadius: 24,
  flex: 1,
})

const ChatMessageHeader = styled.View({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 16,
  gap: 6,
})

const ChatMessageHeaderText = styled(Text)({
  opacity: 0.63,
  fontFamily: 'GoogleSans-Medium',
  fontSize: 13,
})

const MessageContainer = styled.View({
  padding: 16,
})

const MessageText = styled(Text)(({ theme }) => ({
  fontFamily: 'GoogleSans-Regular',
  fontSize: 16,
  color: theme.colors.text,
  lineHeight: 20,
}))

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useAdaptiveTheme()
  const timestampText = useMemo(
    () => dayjs(message.timestamp).format('HH:MM'),
    [message.timestamp]
  )
  const headerColor = useMemo(() => {
    if (message.isUser) {
      return tinycolor(theme.colors.onPrimary).setAlpha(0.07).toRgbString()
    }

    return tinycolor(theme.colors.surface).setAlpha(0.32).toRgbString()
  }, [message.isUser, theme.colors.onPrimary, theme.colors.surface])
  const textColor = useMemo(() => {
    if (message.isUser) {
      return theme.colors.onPrimary
    }

    return theme.colors.text
  }, [message.isUser, theme.colors.onPrimary, theme.colors.text])

  return (
    <ChatMessageContainer
      style={{
        ...(message.isUser && { justifyContent: 'flex-end' }),
        ...(message.isAssistant && { justifyContent: 'flex-start' }),
      }}
    >
      <Root
        style={{
          ...(message.isUser && { backgroundColor: theme.colors.primary }),
          ...(message.isAssistant && {
            backgroundColor: theme.colors.card,
          }),
        }}
      >
        <ChatMessageHeader
          style={{
            backgroundColor: headerColor,
          }}
        >
          <ChatMessageHeaderText
            style={{
              color: textColor,
            }}
          >
            {message.isUser && 'Вы'}
            {message.isAssistant && 'Ассистент'} • {timestampText}
          </ChatMessageHeaderText>
        </ChatMessageHeader>
        <MessageContainer>
          <MessageText
            style={{
              color: textColor,
            }}
          >
            {message.text}
          </MessageText>
        </MessageContainer>
      </Root>
    </ChatMessageContainer>
  )
}

export default ChatMessage
