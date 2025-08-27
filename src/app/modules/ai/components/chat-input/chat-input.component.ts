import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectChatState_loading } from '@modules/ai/chat.selector';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-input',
  imports: [ReactiveFormsModule, TranslateModule, Textarea, ButtonModule],
  templateUrl: './chat-input.component.html',
  standalone: true,
})
export class ChatInputComponent implements OnInit {
  @Input() disabled = false;
  @Input() canFastForward = false;
  @Input() scrollable = false;
  @Output() messageSent = new EventEmitter<string>();
  @Output() fastForward = new EventEmitter<void>();
  @Output() scrollToBottom = new EventEmitter<void>();
  private _store: Store = inject(Store);
  private _loading$: Observable<boolean> = this._store.select(selectChatState_loading);
  isLoading = false;

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    this._loading$.subscribe((data) => {
      this.isLoading = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      message: new FormControl({ value: '', disabled: this.disabled || this.isLoading }),
    });
  }

  onSend() {
    const message = this.form.get('message')?.value;
    if (this.form.valid && !this.disabled && message) {
      this.messageSent.emit(message);
      this.form.reset();
    }
  }

  onEnter(event: Event) {
    if (event instanceof KeyboardEvent && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  onFastForward() {
    this.fastForward.emit();
  }

  onScrollToBottom() {
    this.scrollToBottom.emit();
  }
}
