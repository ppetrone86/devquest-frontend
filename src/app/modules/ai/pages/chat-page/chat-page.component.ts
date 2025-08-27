import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { selectChatState_chatToDelete, selectChatState_chatToEvaluate } from '@modules/ai/chat.selector';
import { ChatArchiveDialogComponent } from '@modules/ai/components/chat-archive-dialog/chat-archive-dialog.component';
import { ChatDeleteDialogComponent } from '@modules/ai/components/chat-delete-dialog/chat-delete-dialog.component';
import { ChatListWrapperComponent } from '@modules/ai/components/chat-list-wrapper/chat-list-wrapper.component';
import { ChatViewportComponent } from '@modules/ai/components/chat-viewport/chat-viewport.component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-page',
  imports: [
    TranslateModule,
    AsyncPipe,
    ChatViewportComponent,
    ChatListWrapperComponent,
    ChatDeleteDialogComponent,
    ChatArchiveDialogComponent,
  ],
  templateUrl: './chat-page.component.html',
  standalone: true,
})
export default class ChatPageComponent {
  private _store: Store = inject(Store);

  chatToDelete$ = this._store.select(selectChatState_chatToDelete);
  chatToEvaluate$ = this._store.select(selectChatState_chatToEvaluate);
}
