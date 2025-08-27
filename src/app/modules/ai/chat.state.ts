import { Chat } from '@modules/ai/chat.model';

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  chatToDelete: Chat | null;
  chatToEvaluate: Chat | null;
  loading: boolean;
}
