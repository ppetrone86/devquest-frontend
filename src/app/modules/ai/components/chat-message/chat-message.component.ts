import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, Input, ViewContainerRef } from '@angular/core';
import { CursorComponent } from '@components/shared/misc/cursor/cursor.component';
import { ChatMessage } from '@modules/ai/chat.model';
import { $dt } from '@primeng/themes';
import { MarkdownPipe } from '@src/app/pipes/markdown.pipe';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-chat-message',
  imports: [Card, MarkdownPipe, AsyncPipe, DatePipe, CursorComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  standalone: true,
})
export default class ChatMessageComponent implements AfterViewInit {
  @Input({ required: true }) message!: ChatMessage;
  @Input() typing? = false;

  private _viewContainerRef = inject(ViewContainerRef);

  private _borderRadius = $dt('border.radius.xl').variable;
  private _messageTokens = {
    shadow: 'none',
    body: {
      padding: '0.75rem',
    },
  };

  modelTokens = {
    ...this._messageTokens,
    color: $dt('chat.message.model.color').variable,
    background: $dt('chat.message.model.background').variable,
    borderRadius: `0 ${this._borderRadius} ${this._borderRadius} ${this._borderRadius}`,
  };

  userTokens = {
    ...this._messageTokens,
    color: $dt('chat.message.user.color').variable,
    background: $dt('chat.message.user.background').variable,
    borderRadius: `${this._borderRadius} 0 ${this._borderRadius} ${this._borderRadius}`,
  };

  ngAfterViewInit() {
    // NOTE: arbitrary delay to ensure that the content of the message is rendered in the DOM before applying the fix
    setTimeout(() => this._fixEmulatedEncapsulation(), 100);
  }

  private _fixEmulatedEncapsulation() {
    const ref: HTMLElement | undefined = this._viewContainerRef.element?.nativeElement;
    if (!ref) return;

    // Wrap any table in a div to avoid horizontal overflow
    ref.querySelectorAll('table').forEach((table) => {
      console.log(table);
      const wrapper = document.createElement('div');
      wrapper.classList.add('table-container');
      table.parentNode?.replaceChild(wrapper, table);
      wrapper.appendChild(table);
    });

    // Add _ngcontent- attribute to all elements inside the component
    const ngHostAttribute = ref.getAttributeNames().find((attr) => attr.startsWith('_nghost-'));
    if (!ngHostAttribute) return;
    const ngContentAttribute = ngHostAttribute.replace('_nghost-', '_ngcontent-');
    ref.querySelectorAll(`:not([${ngContentAttribute}])`).forEach((el) => el.setAttribute(ngContentAttribute, ''));
  }
}
