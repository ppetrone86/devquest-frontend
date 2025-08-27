import { Component, inject, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '@components/shared/dialog/confirm-dialog/confirm-dialog.component';
import * as ChatActions from '@modules/ai/chat.actions';
import { Chat } from '@modules/ai/chat.model';
import { selectChatState_chatToDelete } from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-delete-dialog',
  imports: [TranslateModule, ConfirmDialogComponent],
  templateUrl: './chat-delete-dialog.component.html',
  standalone: true,
})
export class ChatDeleteDialogComponent implements OnInit {
  private _store: Store = inject(Store);
  private _chatToDelete$ = this._store.select(selectChatState_chatToDelete);
  private _chatToDelete: Chat | null = null;

  public visible = false;

  ngOnInit(): void {
    this._initDialog();
  }

  private _initDialog() {
    this._chatToDelete$.pipe().subscribe((chatToDelete) => {
      this._chatToDelete = chatToDelete;
      this.visible = this._chatToDelete != null;
    });
  }

  onAccept() {
    this._store.dispatch(ChatActions.deleteChat());
  }

  onReject() {
    this._store.dispatch(ChatActions.deleteChatAbort());
  }
}
