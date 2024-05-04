type BaseChatMessage = {
  id: string
  text: string
  timestamp: number
}

type AssistantChatMessage = BaseChatMessage & {
  isAssistant: true
  isUser: false
}

type UserChatMessage = BaseChatMessage & {
  isAssistant: false
  isUser: true
  userId: string
}

export type ChatMessage = UserChatMessage | AssistantChatMessage
