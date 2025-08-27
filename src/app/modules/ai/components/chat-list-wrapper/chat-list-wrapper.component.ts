import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ChatLayoutService } from '@components/layouts/services/chat-layout.service';
import { PermissionedDirective } from '@components/shared/permission/permissioned.directive';
import * as ChatActions from '@modules/ai/chat.actions';
import { Chat, ChatStatus } from '@modules/ai/chat.model';
import { selectChatState_chatList, selectChatState_currentChat } from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Panel } from 'primeng/panel';
import { Subscription } from 'rxjs';
import { ChatListComponent } from '../chat-list/chat-list.component';

// TODO: move to shared location
enum ChatType {
  TODAY = 0,
  YESTERDAY = 1,
  OTHER = 2,
  ARCHIVED = 3,
}

// TODO: move to shared location
const chatLabels: Record<ChatType, string> = {
  [ChatType.TODAY]: 'components.chatListWrapper.chatTitles.today',
  [ChatType.YESTERDAY]: 'components.chatListWrapper.chatTitles.yesterday',
  [ChatType.OTHER]: 'components.chatListWrapper.chatTitles.otherDays',
  [ChatType.ARCHIVED]: 'components.chatListWrapper.chatTitles.archived',
};

@Component({
  selector: 'app-chat-list-wrapper',
  imports: [Drawer, Panel, Button, TranslateModule, NgIf, ChatListComponent, PermissionedDirective],
  templateUrl: './chat-list-wrapper.component.html',
  standalone: true,
})
export class ChatListWrapperComponent implements OnInit, OnDestroy {
  private _store: Store = inject(Store);
  private _translateService: TranslateService = inject(TranslateService);
  private _layoutService: ChatLayoutService = inject(ChatLayoutService);
  private _subscriptions: Subscription[] = [];

  private _chats: Chat[] = [];
  private _currentChat: Chat | null = null;

  visible = this._layoutService.chatListOpen;

  chatItems = signal<MenuItem[]>([]);
  archive = signal<MenuItem | undefined>(undefined);

  archiveTokens = {
    background: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    content: {
      padding: 0,
    },
    toggleableHeader: {
      padding: 0,
    },
  };

  ngOnInit(): void {
    const chatListSubscription = this._store.select(selectChatState_chatList).subscribe({
      next: (data: Chat[]) => {
        this._chats = data;
        this._organizeChats();
      },
    });
    this._subscriptions.push(chatListSubscription);

    const currentChatSubscription = this._store.select(selectChatState_currentChat).subscribe({
      next: (data: Chat | null) => {
        this._currentChat = data;
        this._organizeChats();
      },
    });
    this._subscriptions.push(currentChatSubscription);

    // Reload chat list when language changes to update chat titles
    const translateSubscription = this._translateService.onLangChange.subscribe(() => {
      this._loadChatList();
    });
    this._subscriptions.push(translateSubscription);

    this._loadChatList();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  private _isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private _sortByDateAndTitle(chatA: Chat, chatB: Chat): number {
    const dateDiff = chatB.creationTime.valueOf() - chatA.creationTime.valueOf();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return chatA.title.localeCompare(chatB.title);
  }

  private _chatToItem(chat: Chat): MenuItem {
    return {
      label: chat.title,
      id: chat.id,
      state: chat,
      icon: chat.id === this._currentChat?.id ? 'pi pi-check' : undefined,
    };
  }

  private _organizeChats(): void {
    this.chatItems.set([]);
    this.archive.set(undefined);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const chatsMatrix: Partial<Record<ChatType, Chat[]>> = {};

    for (const chat of this._chats) {
      let type = ChatType.OTHER;
      if (chat.status === ChatStatus.CLOSED) {
        type = ChatType.ARCHIVED;
      } else if (this._isSameDay(new Date(chat.creationTime), today)) {
        type = ChatType.TODAY;
      } else if (this._isSameDay(new Date(chat.creationTime), yesterday)) {
        type = ChatType.YESTERDAY;
      }
      if (!chatsMatrix[type]) chatsMatrix[type] = [];
      chatsMatrix[type]!.push(chat);
    }

    for (const type of Object.values(ChatType)) {
      const chats = chatsMatrix[type as ChatType];
      if (chats) {
        chats.sort(this._sortByDateAndTitle);
        const chatList: MenuItem = {
          label: this._translateService.instant(chatLabels[type as ChatType]),
          items: chats.map(this._chatToItem.bind(this)),
        };

        if (type === ChatType.ARCHIVED) {
          chatList.separator = true; // Trick to hide the label when used in the menu
          this.archive.set(chatList);
        } else {
          this.chatItems.update((items) => [...items, chatList]);
        }
      }
    }
  }

  private _loadChatList(): void {
    this._store.dispatch(ChatActions.loadChats({}));
  }

  onNewChat() {
    this._store.dispatch(ChatActions.clearCurrentChat());
  }

  onCloseList() {
    this._layoutService.closeChatList();
  }
}
