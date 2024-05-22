type BaseChatMessage = {
  id: string
  text: string
  timestamp: number
  chatId: string
}

type AssistantChatMessage = BaseChatMessage & {
  isAssistant: boolean
  isUser: boolean
}

export type UserChatMessage = BaseChatMessage & {
  isAssistant: boolean
  isUser: boolean
  userId: string
}

export type ChatMessage = UserChatMessage | AssistantChatMessage
