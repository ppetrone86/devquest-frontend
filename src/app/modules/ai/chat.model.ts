export enum ChatStatus {
  NEW = 'new',
  OPEN = 'open',
  CLOSED = 'closed',
}

export type MessageRole = 'user' | 'model';

export interface Chat {
  id: string;
  title: string;
  creationTime: Date;
  evaluation?: number;
  status: ChatStatus;
  messages: ChatMessage[];
  typingMessage: Partial<ChatMessage> | null;
}

export interface ChatTitle {
  typing: boolean;
  content: string;
}

export interface ChatMessage {
  id?: string;
  index?: number;
  role?: MessageRole;
  creationDate?: Date;
  category?: MessageCategory;
  parts?: string[];
  content: string;
}

export interface ChatTypingMessage extends ChatMessage {
  typing: boolean;
}

export interface MessageCategory {
  name: string;
  description: string;
}

export interface MessagePart {
  id: string;
  partIndex: number;
  partText: string;
}
