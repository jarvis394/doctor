import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from '@utils/db'
import { Chat } from 'src/types/Chat'
import { FetchingState } from 'src/types/FetchingState'
import { AuthState } from './auth'
import { ChatMessage, UserChatMessage } from 'src/types/ChatMessage'
import { firestore } from '@config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import axios from 'axios'

interface ChatsState {
  data: Chat[]
  state: FetchingState
  currentRequestId: string | null
  fetchError: string | null
}

const initialState: ChatsState = {
  data: [],
  state: FetchingState.IDLE,
  currentRequestId: null,
  fetchError: null,
}

type FetchChatsSuccessFN = () => void

export const fetchChats = createAsyncThunk<
  Chat[],
  { successCallback: FetchChatsSuccessFN },
  { state: { chats: ChatsState; auth: AuthState } }
>('chats/get', async (successCallback, { getState, requestId }) => {
  const { user } = getState().auth
  const { state, currentRequestId } = getState().chats

  if (state !== FetchingState.PENDING || requestId !== currentRequestId) {
    return []
  }

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const docs = await db.chats(user.id)
  const res: Chat[] = []

  docs.forEach(async (doc) => {
    const data = doc.data()
    res.push({ ...data, id: doc.id })
  })

  for (const chat of res) {
    const history: ChatMessage[] = []
    // eslint-disable-next-line no-await-in-loop
    const historyDocs = await db.chatMessages(user.id, chat.id)

    historyDocs.forEach((historyDoc) => {
      const historyData = historyDoc.data()
      history.push({ ...historyData, id: historyDoc.id })
    })

    chat.history = history.sort((a, b) => a.timestamp - b.timestamp)
  }

  const sorted = res.sort((a, b) => b.dateStarted - a.dateStarted)
  successCallback()
  return sorted
})

type SuccessFN = (id: string) => void

export const sendMessage = createAsyncThunk<
  void,
  { message: string; chatId: string },
  { state: { chats: ChatsState; auth: AuthState } }
>('chats/get', async ({ message, chatId }, { getState, dispatch }) => {
  const { user } = getState().auth

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const messageData: Omit<UserChatMessage, 'id'> = {
    isAssistant: false,
    isUser: true,
    userId: user.id,
    text: message,
    chatId,
    timestamp: Date.now(),
  }

  const chatRef = collection(
    firestore,
    'users',
    user.id,
    'chats',
    chatId,
    'history'
  )
  const userMessageDoc = await addDoc(chatRef, messageData)

  dispatch(
    addChatMessage({
      ...messageData,
      id: userMessageDoc.id,
      chatId,
    })
  )

  const question = `
  Hello! Act as a dentist app AI-helper. Answer only to questions, related to dentist theme. On other questions politely refuse to respond. Respond in the language question is asked.
  Now provide me only answer to this question: 
  ${message}
  `

  const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_SECRET}`,
        },
      }
  )

  const assistantMessageData: Omit<ChatMessage, 'id'> = {
    isAssistant: true,
    isUser: false,
    text: result.data.choices[0].message.content,
    timestamp: Date.now(),
    chatId: chatId,
  }
  const assistantMessageDoc = await addDoc(chatRef, assistantMessageData)

  dispatch(
    addChatMessage({
      ...assistantMessageData,
      id: assistantMessageDoc.id
    })
  )
})

export const createChat = createAsyncThunk<
  void,
  { message: string; successCallback: SuccessFN },
  { state: { chats: ChatsState; auth: AuthState } }
>('chats/get', async ({ message, successCallback }, { getState, dispatch }) => {
  const { user } = getState().auth
  if (!user) {
    throw new Error('User is not authenticated')
  }

  const chatData: Omit<Chat, 'id'> = {
    dateStarted: Date.now(),
    lastUpdated: Date.now(),
    isWaitingForAssistantResponse: false,
    history: [],
  }
  const userRef = collection(firestore, 'users', user.id, 'chats')
  const chatDoc = await addDoc(userRef, chatData)

  await dispatch(
    addChat({
      ...chatData,
      id: chatDoc.id,
      history: [],
    })
  )

  dispatch(sendMessage({ message, chatId: chatDoc.id }))
  successCallback(chatDoc.id)
})

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, { payload }: PayloadAction<Chat[]>) {
      state.data = payload
    },
    addChat(state, { payload }: PayloadAction<Chat>) {
      state.data.unshift(payload)
    },
    addChatMessage(state, { payload }: PayloadAction<ChatMessage>) {
      const chat = state.data.find((chat) => chat.id === payload.chatId)
      chat?.history.push(payload)
      state.data = [...state.data]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state, action) => {
        if (state.state !== FetchingState.IDLE) {
          return
        }

        state.state = FetchingState.PENDING
        state.currentRequestId = action.meta.requestId
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (
          state.state !== FetchingState.PENDING ||
          state.currentRequestId !== requestId ||
          !action.payload
        ) {
          return
        }

        state.state = FetchingState.FULFILLED
        state.data = action.payload
        state.currentRequestId = null
      })
  },
})

export const { setChats, addChat, addChatMessage } = slice.actions

export const getChats = ({ chats }: { chats: ChatsState }) => chats.data

export default slice.reducer
