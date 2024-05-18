import ChatMessage from '@components/ChatMessage'
import Input from '@components/Input'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import { CHAT_TEST_DATA } from '@screens/Assistant'
import React from 'react'
import { ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'

const InputContainer = styled.View({
  display: 'flex',
  flexShrink: 0,
  width: '100%',
  flexDirection: 'row',
  padding: 16,
  alignItems: 'center',
})

const AssistantChatScreen: React.FC<
  StackNavigationProps<'AssistantChatScreen'>
> = () => {
  const chat = CHAT_TEST_DATA[0]

  return (
    <Screen
      style={{ height: '100%' }}
      safeAreaProps={{
        edges: ['left', 'right', 'bottom'],
        style: {
          height: '100%',
          paddingBottom: 0,
        },
      }}
      contentContainerStyle={{
        flexGrow: 1,
        height: '100%',
      }}
    >
      <ScrollView contentContainerStyle={{ rowGap: 12, padding: 16 }}>
        {chat.history.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </ScrollView>

      <InputContainer>
        <Input placeholder="Напишите сообщение..." />
        <IconButton
          icon="send"
          size={24}
          onPress={() => {
            console.log('send')
          }}
        />
      </InputContainer>
    </Screen>
  )
}

export default AssistantChatScreen
