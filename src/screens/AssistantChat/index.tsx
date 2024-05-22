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
import {addChat, addChatMessage, getChats} from "@store/chats";
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
  const chats = useAppSelector(getChats)

  let chat: Chat
  const chatId: string|null = route.params.chatId

  if (chatId) {
    chat = chats.find(c => c.id === chatId)
  } else {
    //todo create for new chat
    chat = null
  }

  const [message, setMessage] = useState('')
  const handleMessageChange = (text: string) => {
      setMessage(text)
  }
  const messageSent = async () => {
      if (!chat) {
          const chatData: Omit<Chat, 'id'> = {
              dateStarted: Date.now(),
              lastUpdated: Date.now(),
              isWaitingForAssistantResponse: false
          }
          const userRef = collection(firestore, 'users', user.id, 'chats')
          const chatDoc = await addDoc(userRef, chatData)

          await dispatch(
              addChat({
                  ...chatData,
                  id: chatDoc.id,
                  history: []
              })
          )
          chat = chats.find(c => c.id === chatId)
      }
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
        {chat && chat.history.map((message) => (
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
