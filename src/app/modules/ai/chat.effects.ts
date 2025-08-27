import { inject, Injectable } from '@angular/core';
import * as ToastActions from '@components/shared/notifications/toast/toast.actions';
import { ChatMessage, ChatStatus } from '@modules/ai/chat.model';
import { selectChatState_chatToDelete, selectChatState_currentChat } from '@modules/ai/chat.selector';
import { ChatService } from '@modules/ai/chat.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _chatService: ChatService = inject(ChatService);

  loadChats$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.loadChats),
      mergeMap(({ selectedChat }) =>
        this._chatService.list().pipe(
          map((chats) => chats.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime())),
          map((sortedChats) => ChatActions.loadChatsSuccess({ chats: sortedChats, selectedChat })),
          catchError((error) => of(ChatActions.loadChatsError({ error })))
        )
      )
    )
  );

  loadChatSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.loadChatsSuccess),
      mergeMap(({ selectedChat }) => {
        const actions = [];
        if (selectedChat) actions.push(ChatActions.loadChatMessages({ chatId: selectedChat.id }));
        return actions;
      })
    )
  );

  loadChatMessages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.loadChatMessages),
      mergeMap(({ chatId }) =>
        this._chatService.fetchMessages(chatId).pipe(
          // delay(50),
          map((messages) => ChatActions.loadChatMessagesSuccess({ messages })),
          catchError((error) => of(ChatActions.loadChatMessagesError({ error })))
        )
      )
    )
  );

  createChat$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.createChat),
      mergeMap(({ content }) =>
        this._chatService.create().pipe(
          concatMap((chat) =>
            this._chatService.sendMessage(chat.id, content).pipe(
              map((message: ChatMessage) => ChatActions.createChatSuccess({ chat })),
              catchError((error) => of(ChatActions.createChatError({ error })))
            )
          ),
          catchError((error) => of(ChatActions.createChatError({ error })))
        )
      )
    )
  );

  createChatSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.createChatSuccess),
      map(({ chat }) => ChatActions.loadChats({ selectedChat: chat }))
    )
  );

  createChatError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.createChatError),
      map(({ error }) => ToastActions.showErrorToast({ toast: { detail: error } }))
    )
  );

  sendMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.sendMessage),
      withLatestFrom(this._store.select(selectChatState_currentChat)),
      mergeMap(([{ content }, currentChat]) => {
        if (!currentChat) {
          return of();
        }

        return this._chatService.sendMessage(currentChat.id, content).pipe(
          map((message) => {
            return ChatActions.sendMessageSuccess({ message });
          }),
          catchError((error) => of(ChatActions.sendMessageError({ error })))
        );
      })
    )
  );

  deleteChat$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.deleteChat),
      withLatestFrom(this._store.select(selectChatState_chatToDelete)),
      mergeMap(([action, chatToDelete]) => {
        if (!chatToDelete) {
          return of(ChatActions.deleteChatError({ error: 'entities.chats.errors.chatNotSelected' }));
        }
        return this._chatService.deleteChat(chatToDelete.id).pipe(
          map(() => ChatActions.deleteChatSuccess({ deletedChat: chatToDelete })),
          catchError((error) => of(ChatActions.deleteChatError({ error })))
        );
      })
    )
  );

  deleteChatError = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.deleteChatError),
      map(({ error }) => ToastActions.showErrorToast({ toast: { detail: error } }))
    )
  );

  deleteChatSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.deleteChatSuccess),
      withLatestFrom(this._store.select(selectChatState_currentChat)),
      concatMap(([{ deletedChat }, currentChat]) => {
        const actions$ = [];

        if (currentChat?.id === deletedChat?.id) {
          actions$.push(ChatActions.clearCurrentChat());
        }
        actions$.push(ChatActions.loadChats({}));
        actions$.push(
          ToastActions.showSuccessToast({
            toast: {},
          })
        );

        return actions$;
      })
    )
  );

  evaluateChat$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.evaluateChat),
      mergeMap(({ chatToEvaluate, rate }) => {
        if (!chatToEvaluate) {
          return of(ChatActions.evaluateChatError({ error: 'entities.chats.errors.chatNotSelected' }));
        }

        if (!chatToEvaluate.evaluation && chatToEvaluate.status == ChatStatus.NEW) {
          return of(ChatActions.evaluateChatError({ error: 'entities.chats.errors.chatNewEvaluationNotAllowed' }));
        }

        if (chatToEvaluate.evaluation && chatToEvaluate.status != ChatStatus.CLOSED) {
          return of(ChatActions.evaluateChatError({ error: 'entities.chats.errors.chatAlreadyEvaluated' }));
        }

        if (chatToEvaluate.status == ChatStatus.CLOSED) {
          return of(ChatActions.evaluateChatError({ error: 'entities.chats.errors.chatClosed' }));
        }

        return this._chatService.evaluate(chatToEvaluate.id, rate).pipe(
          map((evaluatedChat) => {
            return ChatActions.evaluateChatSuccess({ evaluatedChat: evaluatedChat });
          }),
          catchError((error) => of(ChatActions.evaluateChatError({ error })))
        );
      })
    )
  );

  evaluateChatSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.evaluateChatSuccess),
      withLatestFrom(this._store.select(selectChatState_currentChat)),
      concatMap(([{ evaluatedChat }, currentChat]) => {
        const actions$ = [];

        if (currentChat?.id === evaluatedChat?.id) {
          actions$.push(ChatActions.setCurrentChat({ currentChat: evaluatedChat }));
        }
        actions$.push(ChatActions.loadChats({}));
        actions$.push(
          ToastActions.showSuccessToast({
            toast: {},
          })
        );

        return actions$;
      })
    )
  );

  evaluateChatError = createEffect(() =>
    this._actions$.pipe(
      ofType(ChatActions.evaluateChatError),
      map(({ error }) => ToastActions.showErrorToast({ toast: { detail: error } }))
    )
  );
}
