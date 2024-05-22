import Input from '@components/Input'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '@store/index'
import ChatMessage from '@components/ChatMessage'
import { createChat, getChats, sendMessage } from '@store/chats'

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
> = ({ route }) => {
  const dispatch = useAppDispatch()
  const [chatId, setChatId] = useState(route.params.chatId)
  const chats = useAppSelector(getChats)
  const chat = chats.find((chat) => chat.id === chatId)
  const [message, setMessage] = useState('')
  const handleMessageChange = (text: string) => {
    setMessage(text)
  }

  console.log(chat)

  const messageSent = async () => {
    setMessage('')
    if (!chat) {
      dispatch(
        createChat({ message, successCallback: (id: string) => setChatId(id) })
      )
      return
    }
    if (!message || !chatId) return
    dispatch(sendMessage({ chatId, message }))
  }

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
        {chat &&
          chat.history.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
      </ScrollView>

      <InputContainer>
        <Input
          placeholder="Напишите сообщение..."
          onChangeText={handleMessageChange}
          value={message}
        />
        <IconButton icon="send" size={24} onPress={messageSent} />
      </InputContainer>
    </Screen>
  )
}

export default AssistantChatScreen
