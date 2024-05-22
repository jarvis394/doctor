import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from '@utils/db'
import { Chat } from 'src/types/Chat'
import { FetchingState } from 'src/types/FetchingState'
import { AuthState } from './auth'
import { ChatMessage } from 'src/types/ChatMessage'

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

export const fetchChats = createAsyncThunk<
  Chat[],
  void,
  { state: { chats: ChatsState; auth: AuthState } }
>('chats/get', async (_, { getState, requestId }) => {
  const { user } = getState().auth
  const { state, currentRequestId } = getState().chats

  if (state !== FetchingState.PENDING || requestId !== currentRequestId) {
    return []
  }

  if (!user) {
    console.warn('fetchChats: No user')
    return []
  }

  const docs = await db.chats(user.id)
  const res: Chat[] = []

  docs.forEach(async (doc) => {
    const data = doc.data()
    res.push({ ...data, id: doc.id })
  })

  for (const chat of res) {
    const history: ChatMessage[] = []
    const historyDocs = await db.chatMessages(user.id, chat.id)

    historyDocs.forEach((historyDoc) => {
      const historyData = historyDoc.data()
      history.push({ ...historyData, id: historyDoc.id })
    })

    chat.history = history
  }

  return res
})

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, { payload }: PayloadAction<Chat[]>) {
      state.data = payload
    },
    addChat(state, { payload }: PayloadAction<Chat>) {
      state.data = [...state.data, payload]
    },
    addChatMessage(state, { payload }: PayloadAction<ChatMessage>) {
      state.data.find((c) => c.id === payload.chatId).history.push(payload)
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
