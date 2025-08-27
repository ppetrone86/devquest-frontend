import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '@components/shared/dialog/confirm-dialog/confirm-dialog.component';
import * as ChatActions from '@modules/ai/chat.actions';
import { Chat } from '@modules/ai/chat.model';
import { selectChatState_chatToEvaluate } from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Rating } from 'primeng/rating';

@Component({
  selector: 'app-chat-archive-dialog',
  imports: [Rating, FormsModule, TranslateModule, ConfirmDialogComponent],
  templateUrl: './chat-archive-dialog.component.html',
  standalone: true,
})
export class ChatArchiveDialogComponent implements OnInit {
  private _store: Store = inject(Store);
  private _chatToEvaluate$ = this._store.select(selectChatState_chatToEvaluate);
  private _chatToEvaluate: Chat | null = null;

  public visible = false;
  public rate: number | undefined;

  ratingTokens = {
    gap: '0.5rem',
    icon: {
      size: '1.75rem',
    },
  };

  ngOnInit(): void {
    this._initDialog();
  }

  private _initDialog() {
    this._chatToEvaluate$.pipe().subscribe((chatToEvaluate) => {
      this._chatToEvaluate = chatToEvaluate;
      this.visible = this._chatToEvaluate != null;
    });
  }

  onAccept() {
    if (!this._chatToEvaluate) this.onReject();
    // HACK: remove the default rate when evaluateChat will accept undefined
    this._store.dispatch(ChatActions.evaluateChat({ chatToEvaluate: this._chatToEvaluate!, rate: this.rate ?? 3 }));
  }

  onReject() {
    this._store.dispatch(ChatActions.evaluateChatAbort());
  }
}
