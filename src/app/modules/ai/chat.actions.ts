import { Chat, ChatMessage } from '@modules/ai/chat.model';
import { createAction, props } from '@ngrx/store';

export enum ChatActionType {
  CHAT_LOAD_CHATS = '[Chat] Load chats',
  CHAT_LOAD_CHATS_SUCCESS = '[Chat] Load chats success',
  CHAT_LOAD_CHATS_ERROR = '[Chat] Load chats error',
  CHAT_SET_CURRENT_CHAT = '[Chat] Set current chat',
  CHAT_CLEAR_CURRENT_CHAT = '[Chat] Clear current chat',
  CHAT_CREATE_CHAT = '[Chat] Create chat',
  CHAT_CREATE_CHAT_SUCCESS = '[Chat] Create chat success',
  CHAT_CREATE_CHAT_ERROR = '[Chat] Create chat error',
  CHAT_SELECT_CHAT_ERROR = '[Chat] Select chat error',
  CHAT_DELETE_SET_CHAT_TO_DELETE = '[Chat] Set chat to delete',
  CHAT_DELETE_CHAT = '[Chat] Delete chat',
  CHAT_DELETE_CHAT_SUCCESS = '[Chat] Delete chat success',
  CHAT_DELETE_CHAT_ABORT = '[Chat] Delete chat abort',
  CHAT_EVALUATE_SET_CHAT_TO_EVALUATE = '[Chat] Set chat to evaluate',
  CHAT_EVALUATE_CHAT = '[Chat] Evaluate chat',
  CHAT_EVALUATE_CHAT_SUCCESS = '[Chat] Evaluate chat success',
  CHAT_EVALUATE_CHAT_ABORT = '[Chat] Evaluate chat abort',
  CHAT_EVALUATE_CHAT_ERROR = '[Chat] Evaluate chat error',
  CHAT_LOAD_CHAT_MESSAGES = '[Chat] Load chat messages',
  CHAT_LOAD_CHAT_MESSAGES_SUCCESS = '[Chat] Load chat messages success',
  CHAT_LOAD_CHAT_MESSAGES_ERROR = '[Chat] Load chat messages error',
  CHAT_SEND_MESSAGE = '[Chat] Send message',
  CHAT_APPEND_MESSAGE_TO_CHAT = '[Chat] Append Message to Chat',
  CHAT_SEND_MESSAGE_SUCCESS = '[Chat] Send message success',
  CHAT_SEND_MESSAGE_ERROR = '[Chat] Send message error',
}

// Actions to handle chats
export const loadChats = createAction(ChatActionType.CHAT_LOAD_CHATS, props<{ selectedChat?: Chat }>());
export const loadChatsSuccess = createAction(
  ChatActionType.CHAT_LOAD_CHATS_SUCCESS,
  props<{ chats: Chat[]; selectedChat?: Chat }>()
);
export const loadChatsError = createAction(ChatActionType.CHAT_LOAD_CHATS_ERROR, props<{ error: any }>());

// Actions to handle load chat messages
export const loadChatMessages = createAction(ChatActionType.CHAT_LOAD_CHAT_MESSAGES, props<{ chatId: string }>());
export const loadChatMessagesSuccess = createAction(
  ChatActionType.CHAT_LOAD_CHAT_MESSAGES_SUCCESS,
  props<{ messages: ChatMessage[] }>()
);
export const loadChatMessagesError = createAction(
  ChatActionType.CHAT_LOAD_CHAT_MESSAGES_ERROR,
  props<{ error: any }>()
);

// Actions to handle create chat
export const setCurrentChat = createAction(ChatActionType.CHAT_SET_CURRENT_CHAT, props<{ currentChat: Chat | null }>());
export const clearCurrentChat = createAction(ChatActionType.CHAT_CLEAR_CURRENT_CHAT);
export const createChat = createAction(ChatActionType.CHAT_CREATE_CHAT, props<{ content: string }>());
export const createChatSuccess = createAction(ChatActionType.CHAT_CREATE_CHAT_SUCCESS, props<{ chat: Chat }>());
export const createChatError = createAction(ChatActionType.CHAT_CREATE_CHAT_ERROR, props<{ error: any }>());

// Actions to handle delete chat
export const setChatToDelete = createAction(
  ChatActionType.CHAT_DELETE_SET_CHAT_TO_DELETE,
  props<{ chatToDelete: Chat }>()
);
export const deleteChat = createAction(ChatActionType.CHAT_DELETE_CHAT);
export const deleteChatSuccess = createAction(ChatActionType.CHAT_DELETE_CHAT_SUCCESS, props<{ deletedChat: Chat }>());
export const deleteChatAbort = createAction(ChatActionType.CHAT_DELETE_CHAT_ABORT);
export const deleteChatError = createAction(ChatActionType.CHAT_SELECT_CHAT_ERROR, props<{ error: string }>());

// Actions to handle evaluate chat
export const setChatToEvaluate = createAction(
  ChatActionType.CHAT_EVALUATE_SET_CHAT_TO_EVALUATE,
  props<{ chatToEvaluate: Chat }>()
);
export const evaluateChat = createAction(
  ChatActionType.CHAT_EVALUATE_CHAT,
  props<{ chatToEvaluate: Chat; rate: number }>()
);
export const evaluateChatSuccess = createAction(
  ChatActionType.CHAT_EVALUATE_CHAT_SUCCESS,
  props<{ evaluatedChat: Chat }>()
);
export const evaluateChatAbort = createAction(ChatActionType.CHAT_EVALUATE_CHAT_ABORT);
export const evaluateChatError = createAction(ChatActionType.CHAT_EVALUATE_CHAT_ERROR, props<{ error: any }>());

// Action to handle the process of sending a user message and handling the received response
export const sendMessage = createAction(ChatActionType.CHAT_SEND_MESSAGE, props<{ chatId: string; content: string }>());
export const sendMessageSuccess = createAction(
  ChatActionType.CHAT_SEND_MESSAGE_SUCCESS,
  props<{ message: ChatMessage }>()
);
export const sendMessageError = createAction(ChatActionType.CHAT_SEND_MESSAGE_ERROR, props<{ error: any }>());
export const appendMessageToChat = createAction(ChatActionType.CHAT_APPEND_MESSAGE_TO_CHAT);
