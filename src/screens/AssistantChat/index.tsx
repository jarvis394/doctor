import ChatMessage from '@components/ChatMessage'
import Input from '@components/Input'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import { CHAT_TEST_DATA } from '@screens/Assistant'
import React from 'react'
import { ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const History = styled(ScrollView)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: 16,
})

const InputContainer = styled.View({
  display: 'flex',
  flexShrink: 0,
  width: '100%',
  flexDirection: 'row',
  padding: 16,
  position: 'absolute',
  bottom: 0,
})

const AssistantChatScreen: React.FC<
  StackNavigationProps<'AssistantChatScreen'>
> = () => {
  const chat = CHAT_TEST_DATA[0]

  return (
    <Screen
      safeAreaProps={{
        edges: ['left', 'right', 'bottom'],
        style: { paddingBottom: 0, flexGrow: 1 },
      }}
    >
      <KeyboardAwareScrollView
        style={{
          flexGrow: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <History
          contentContainerStyle={{
            rowGap: 16,
            flexGrow: 1,
          }}
        >
          {chat.history.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </History>
        <InputContainer>
          <Input placeholder="Напишите сообщение..." />
        </InputContainer>
      </KeyboardAwareScrollView>
    </Screen>
  )
}

export default AssistantChatScreen
