import { ChatMessage, MessageRole } from '@modules/ai/chat.model';
import { createReducer, on } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import { ChatState } from './chat.state';

export const initialState: ChatState = {
  chats: [],
  currentChat: null,
  chatToDelete: null,
  chatToEvaluate: null,
  loading: false,
};

export const chatReducer = createReducer(
  initialState,
  // Reducers to handle load chats
  on(ChatActions.loadChats, (state) => ({ ...state, loading: true })),
  on(ChatActions.loadChatsSuccess, (state, { chats }) => ({
    ...state,
    chats,
    loading: false,
  })),
  on(ChatActions.loadChatsError, (state) => ({ ...state, loading: false })),

  // Reducers to select chat
  on(ChatActions.loadChatMessages, (state, { chatId }) => ({
    ...state,
    currentChat: state.chats.find((chat) => chat.id === chatId) || null,
    chatToDelete: null,
    chatToEvaluate: null,
    loading: true,
  })),

  // Reducer to handle chat messages
  on(ChatActions.loadChatMessagesSuccess, (state, { messages }) => ({
    ...state,
    currentChat: state.currentChat ? { ...state.currentChat, messages } : null,
    loading: false,
  })),
  on(ChatActions.loadChatMessagesError, (state) => ({ ...state, loading: false })),

  // Reducers to handle create
  on(ChatActions.clearCurrentChat, (state) => ({
    ...state,
    currentChat: null,
    loading: false,
  })),

  on(ChatActions.createChat, (state) => ({
    ...state,
    loading: true,
  })),
  on(ChatActions.createChatSuccess, (state) => ({
    ...state,
  })),

  // Reducer to handle update chat
  on(ChatActions.setCurrentChat, (state: ChatState, { currentChat }) => ({
    ...state,
    currentChat: currentChat,
  })),

  // Reducer to handle send message
  on(ChatActions.sendMessage, (state, { content }) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: 'user' as MessageRole,
      creationDate: new Date(),
    };
    return {
      ...state,
      currentChat: state.currentChat
        ? { ...state.currentChat, messages: [...state.currentChat.messages, userMessage] }
        : null,
      loading: false,
    };
  }),
  on(ChatActions.sendMessageSuccess, (state, { message }) => ({
    ...state,
    currentChat: state.currentChat ? { ...state.currentChat, typingMessage: { ...message } } : null,
  })),
  on(ChatActions.appendMessageToChat, (state) => ({
    ...state,
    currentChat: state.currentChat
      ? {
          ...state.currentChat,
          messages: [...state.currentChat.messages, state.currentChat.typingMessage as ChatMessage],
          typingMessage: null,
        }
      : null,
    loading: false,
  })),

  // Reducers to handle delete chat
  on(ChatActions.setChatToDelete, (state: ChatState, { chatToDelete }) => ({
    ...state,
    chatToDelete,
  })),
  on(ChatActions.deleteChatSuccess, (state: ChatState) => ({
    ...state,
    chatToDelete: null,
  })),
  on(ChatActions.deleteChatError, (state: ChatState) => ({
    ...state,
    chatToDelete: null,
  })),

  // Reducers to handle evaluate chat
  on(ChatActions.deleteChatAbort, (state: ChatState) => ({
    ...state,
    chatToDelete: null,
  })),
  on(ChatActions.setChatToEvaluate, (state: ChatState, { chatToEvaluate }) => ({
    ...state,
    chatToEvaluate,
  })),
  on(ChatActions.evaluateChatSuccess, (state: ChatState) => ({
    ...state,
    chatToEvaluate: null,
  })),
  on(ChatActions.evaluateChatError, (state: ChatState) => ({
    ...state,
    chatToEvaluate: null,
  })),
  on(ChatActions.evaluateChatAbort, (state: ChatState) => ({
    ...state,
    chatToEvaluate: null,
  }))
);
