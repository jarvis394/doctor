import { ChatMessage } from './ChatMessage'

export interface Chat {
  id: string
  dateStarted: number
  lastUpdated: number
  isWaitingForAssistantResponse: boolean
  history: ChatMessage[]
}
