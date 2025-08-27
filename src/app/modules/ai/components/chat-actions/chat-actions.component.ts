import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as ChatActions from '@modules/ai/chat.actions';
import { Chat, ChatStatus } from '@modules/ai/chat.model';
import { PermissionService } from '@modules/auth/permission.service';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { SplitButton } from 'primeng/splitbutton';
import { combineLatest } from 'rxjs';

type ChatActionsType = 'button' | 'menu';

@Component({
  selector: 'app-chat-actions',
  imports: [Menu, Button, SplitButton, TranslateModule],
  templateUrl: './chat-actions.component.html',
  standalone: true,
})
export class ChatActionsComponent implements OnInit, OnChanges {
  @Input({ required: true }) chat!: Chat;
  @Input({ required: true }) type!: ChatActionsType;
  @Input() label: string | undefined;
  @Input() selected = false;
  @Output() callback = new EventEmitter<MouseEvent>();

  private _store: Store = inject(Store);
  private _translationService: TranslateService = inject(TranslateService);
  private _permissionService: PermissionService = inject(PermissionService);

  private _permissions = {
    update: false,
    delete: false,
  };

  public key!: string;
  public actions: MenuItem[] = [];

  ngOnInit(): void {
    this.key = [this.type, this.chat.id].join('-');
    this._setupActions();
    combineLatest([
      this._permissionService.hasPermission('ai.chat.update'),
      this._permissionService.hasPermission('ai.chat.delete'),
    ]).subscribe({
      next: ([canUpdateChat, canDeleteChat]) => {
        this._permissions = {
          update: canUpdateChat,
          delete: canDeleteChat,
        };
        this._setupActions();
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat']) {
      this._setupActions();
    }
  }

  private _setupActions() {
    this.actions = [
      this.chat.status !== ChatStatus.CLOSED && this._permissions.update
        ? {
            label: this._translationService.instant('components.chatActions.archive.label'),
            tooltip: this._translationService.instant('components.chatActions.archive.title'),
            icon: 'pi pi-lock',
            command: () => this.onArchive(),
          }
        : undefined,
      this._permissions.delete
        ? {
            label: this._translationService.instant('components.chatActions.delete.label'),
            tooltip: this._translationService.instant('components.chatActions.delete.title'),
            icon: 'pi pi-trash',
            command: () => this.onDelete(),
          }
        : undefined,
    ].filter(Boolean) as MenuItem[];
  }

  onClick(event: MouseEvent) {
    this.callback.emit(event);
  }

  onDelete() {
    this._store.dispatch(ChatActions.setChatToDelete({ chatToDelete: this.chat }));
  }

  onArchive() {
    this._store.dispatch(ChatActions.setChatToEvaluate({ chatToEvaluate: this.chat }));
  }
}
