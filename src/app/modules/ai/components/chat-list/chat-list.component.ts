import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import * as ChatActions from '@modules/ai/chat.actions';
import { Chat } from '@modules/ai/chat.model';
import { selectChatState_currentChat } from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { ChatActionsComponent } from '../chat-actions/chat-actions.component';

@Component({
  selector: 'app-chat-list',
  imports: [Menu, TranslateModule, ChatActionsComponent],
  templateUrl: './chat-list.component.html',
  standalone: true,
})
export class ChatListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) model!: MenuItem[];

  private _store: Store = inject(Store);
  private _subscriptions: Subscription[] = [];

  currentChatId: string | undefined;

  ngOnInit(): void {
    const chatIdSubscription = this._store.select(selectChatState_currentChat).subscribe((chat) => {
      this.currentChatId = chat?.id;
    });
    this._subscriptions.push(chatIdSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  menuTokens = {
    background: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    shadow: 'none',
    list: {
      padding: 0,
    },
    submenuLabel: {
      padding: '.5rem 0',
    },
    separator: {
      borderColor: 'transparent',
    },
  };

  onChatSelect(chat: Chat): void {
    this._store.dispatch(ChatActions.loadChatMessages({ chatId: chat.id }));
  }
}
