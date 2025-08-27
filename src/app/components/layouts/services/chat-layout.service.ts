import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatLayoutService {
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  chatListOpen = signal<boolean>(this._isBrowser);

  openChatList() {
    this.chatListOpen.set(true);
  }

  closeChatList() {
    this.chatListOpen.set(false);
  }

  toggleChatList() {
    this.chatListOpen.update((value) => !value);
  }
}
