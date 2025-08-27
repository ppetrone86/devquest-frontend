import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatLayoutService } from '@components/layouts/services/chat-layout.service';
import { EffectsService, TypeAbortReason } from '@components/layouts/services/effects.service';
import { CursorComponent } from '@components/shared/misc/cursor/cursor.component';
import { PermissionedDirective } from '@components/shared/permission/permissioned.directive';
import * as ChatAction from '@modules/ai/chat.actions';
import { Chat, ChatMessage, ChatTitle, ChatTypingMessage } from '@modules/ai/chat.model';
import {
  selectChatState_currentChat,
  selectChatState_currentChat_chatMessages,
  selectChatState_loading,
  selectChatState_typingMessage,
} from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Rating } from 'primeng/rating';
import { Skeleton } from 'primeng/skeleton';
import { debounce, fromEvent, Observable, Subscription, take, timer } from 'rxjs';
import { ChatSkeletonComponent } from '../../../../components/shared/skeletons/chat-skeleton/chat-skeleton.component';
import { ChatActionsComponent } from '../chat-actions/chat-actions.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import ChatMessageComponent from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-viewport',
  imports: [
    Button,
    Message,
    Rating,
    Skeleton,
    FormsModule,
    AsyncPipe,
    NgTemplateOutlet,
    TranslateModule,
    ChatInputComponent,
    ChatActionsComponent,
    ChatMessageComponent,
    CursorComponent,
    ChatSkeletonComponent,
    PermissionedDirective,
  ],
  templateUrl: './chat-viewport.component.html',
  standalone: true,
})
export class ChatViewportComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') private _scrollContainer?: ElementRef;

  private _store: Store = inject(Store);
  private _translationService: TranslateService = inject(TranslateService);
  private _layoutService: ChatLayoutService = inject(ChatLayoutService);
  private _effectsService: EffectsService = inject(EffectsService);
  private _subscriptions: Subscription[] = [];
  private _scrollSubscription: Subscription | null = null;
  private _loading$: Observable<boolean> = this._store.select(selectChatState_loading);
  private _currentChat$: Observable<Chat | null> = this._store.select(selectChatState_currentChat);
  private _typingMessage$: Observable<Partial<ChatMessage> | null> = this._store.select(selectChatState_typingMessage);
  private _typingMessageController = new AbortController();

  public loading = false;
  public chat: Chat | null = null;
  public messages$: Observable<ChatMessage[]> = this._store.select(selectChatState_currentChat_chatMessages);
  public typingMessage: ChatTypingMessage | null = null;
  public typingTitle: ChatTitle | null = null;
  public readonly scrollThresholdPx = 20;
  public readonly scrollDebounceMs = 100;
  public readonly loadingDebounceMs = 100;
  public readonly typingScrollDebounceMs = 5;

  chatListVisible = this._layoutService.chatListOpen;
  pinnedToBottom = true;
  showScrollToBottom = false;

  ngOnInit(): void {
    let loadingDebounceTimeout: NodeJS.Timeout;
    const loadingSubscription = this._loading$.subscribe((loading) => {
      // Debounce the loading state to prevent showing it for short loading times
      clearTimeout(loadingDebounceTimeout);
      loadingDebounceTimeout = setTimeout(() => {
        this.loading = loading;
      }, this.loadingDebounceMs);
    });
    this._subscriptions.push(loadingSubscription);

    const chatSubscription = this._currentChat$.subscribe((chat) => {
      if (!chat) {
        this._typeTitle();
        this.chat = null;
      } else {
        this.chat = chat;
        this._listenToScrollEvent();
        this._scheduleScrollToBottom();
      }
    });
    this._subscriptions.push(chatSubscription);

    const typingSubscription = this._typingMessage$.subscribe((typingMessage) => {
      this._abortTypingMessage();
      if (typingMessage && typingMessage.role === 'model' && typingMessage.content !== '') {
        this._typeMessage(typingMessage);
      }
    });
    this._subscriptions.push(typingSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
    this._scrollSubscription?.unsubscribe();
  }

  private _listenToScrollEvent(): void {
    const container = this._scrollContainer?.nativeElement;
    if (!container) return;
    this._scrollSubscription?.unsubscribe();
    this._scrollSubscription = fromEvent(container, 'scroll')
      .pipe(debounce(() => timer(this.typingMessage?.typing ? this.typingScrollDebounceMs : this.scrollDebounceMs)))
      .subscribe(() => this.onScroll());
  }

  private _scheduleScrollToBottom() {
    if (this.pinnedToBottom) {
      setTimeout(() => this.scrollToBottom(), 0);
    } else {
      this.showScrollToBottom = true;
    }
  }

  private _typeTitle() {
    const fullText: string = this._translationService.instant('components.chatMessage.welcomeMessage');
    if (fullText === undefined) return;

    this._effectsService.typeText(fullText, (text, typing) => {
      this.typingTitle = { content: text, typing };
    });
  }

  private _abortTypingMessage(fastForward = false) {
    const reason = fastForward ? TypeAbortReason.FAST_FORWARD : undefined;
    this._typingMessageController.abort(reason);
    this._typingMessageController = new AbortController();
    if (!fastForward) {
      this.typingMessage = null;
    }
  }

  private _typeMessage(message: Partial<ChatMessage>) {
    const fullText = message.content;
    if (fullText == undefined) return;

    this._effectsService.typeText(
      fullText,
      (text, typing) => {
        this.typingMessage = { ...message, content: text, typing };
        this._scheduleScrollToBottom();

        // TODO: improve how to handle last message from ai!
        if (!typing) this._store.dispatch(ChatAction.appendMessageToChat());
      },
      this._typingMessageController.signal
    );
  }

  getTranslation(key: string): Observable<string> {
    return this._translationService.get(key);
  }

  sendMessage(content: string) {
    if (!content.trim()) return;
    this._store
      .select(selectChatState_currentChat)
      .pipe(take(1))
      .subscribe((currentChat) => {
        if (!currentChat) {
          this._store.dispatch(ChatAction.createChat({ content }));
        } else {
          this._store.dispatch(ChatAction.sendMessage({ chatId: '', content }));
        }
      });
  }

  onNewChat() {
    this._store.dispatch(ChatAction.clearCurrentChat());
  }

  openChatList() {
    this._layoutService.openChatList();
  }

  onScroll() {
    const container = this._scrollContainer?.nativeElement;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - this.scrollThresholdPx;
    this.pinnedToBottom = isAtBottom;
    if (isAtBottom) this.showScrollToBottom = false;
  }

  scrollToBottom() {
    const container = this._scrollContainer?.nativeElement;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    this.pinnedToBottom = true;
    this.showScrollToBottom = false;
  }

  onFastForwardTyping() {
    this._abortTypingMessage(true);
    this.pinnedToBottom = true;
    this._scheduleScrollToBottom();
  }
}
