import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './table-actions.component.html',
})
export class TableActionsComponent {
  @Input() actions: any[] = [];
  @Input() row: any;
  @Output() actionClick = new EventEmitter<{ action: any; row: any }>();

  onActionClick(action: any) {
    this.actionClick.emit({ action, row: this.row });
  }
}
