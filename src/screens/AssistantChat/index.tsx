import Input from '@components/Input'
import Screen from '@components/Screen'
import styled from '@emotion/native'
import { StackNavigationProps } from '@routes'
import React, {useState} from 'react'
import { ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '@store/index'
import { Chat } from 'src/types/Chat'
import { ChatMessage as ChatMessageType } from 'src/types/ChatMessage'
import ChatMessage from "@components/ChatMessage";
import {addChatMessage, getChats} from "@store/chats";
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "@config/firebase";
import {getUser} from "@store/auth";

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
> = ({navigation, route}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)

  let chat: Chat
  const chatId: string|null = route.params.chatId
  if (chatId) {
    chat = useAppSelector(getChats).find(c => c.id === chatId)
  } else {
    //todo create for new chat
    chat = useAppSelector(getChats).find(c => c.id === chatId)
  }

  const [message, setMessage] = useState('')
  const handleMessageChange = (text: string) => {
      setMessage(text)
  }
  const messageSent = async () => {
    const messageData: Omit<ChatMessageType, 'id'> = {
      isAssistant: false,
      isUser: true,
      userId: user.id,
      text: message,
      timestamp: Date.now()
    }

    const chatRef = collection(firestore, 'users', user.id, 'chats', chat.id, 'history')
    const userMessageDoc = await addDoc(chatRef, messageData)

    dispatch(
      addChatMessage({
        ...messageData,
        id: userMessageDoc.id,
        chatId: chat.id,
      })
    )
    setMessage('')

    //assistant response mock
      const assistantMessageDoc = await addDoc(chatRef, messageData)

      dispatch(
          addChatMessage({
              isAssistant: true,
              isUser: false,
              text: 'I RESPOND TO THEE',
              timestamp: Date.now(),
              id: assistantMessageDoc.id,
              chatId: chat.id,
          })
      )
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
        {chat.history.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </ScrollView>

      <InputContainer>
        <Input
            placeholder="Напишите сообщение..."
            onChangeText={handleMessageChange}
            value={message}
        />
        <IconButton
          icon="send"
          size={24}
          onPress={messageSent}
        />
      </InputContainer>
    </Screen>
  )
}

export default AssistantChatScreen
