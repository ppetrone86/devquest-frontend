import { ChatState } from '@modules/ai/chat.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectChatState = createFeatureSelector<ChatState>('chatState');

export const selectChatState_loading = createSelector(selectChatState, (state: ChatState) => state.loading);

export const selectChatState_chatList = createSelector(selectChatState, (state: ChatState) => state.chats);

export const selectChatState_currentChat = createSelector(selectChatState, (state: ChatState) => state.currentChat);
export const selectChatState_chatToDelete = createSelector(selectChatState, (state: ChatState) => state.chatToDelete);
export const selectChatState_chatToEvaluate = createSelector(
  selectChatState,
  (state: ChatState) => state.chatToEvaluate
);

export const selectChatState_currentChat_chatMessages = createSelector(selectChatState, (state: ChatState) =>
  state.currentChat ? state.currentChat.messages : []
);

export const selectChatState_typingMessage = createSelector(selectChatState_currentChat, (currentChat) =>
  currentChat ? currentChat.typingMessage : null
);
