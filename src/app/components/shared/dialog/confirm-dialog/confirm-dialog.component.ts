import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tooltip } from 'primeng/tooltip';

interface ConfirmAction {
  label?: Button['label'];
  tooltip?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialog, Button, Tooltip, TranslateModule],
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
})
export class ConfirmDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() header?: string;
  @Input() message?: string;
  @Input() icon?: string;
  @Input() severity?: Button['severity'];
  @Input({ required: true }) accept!: ConfirmAction;
  @Input({ required: true }) reject!: ConfirmAction;
  @Output() acceptCallback = new EventEmitter<MouseEvent>();
  @Output() rejectCallback = new EventEmitter<MouseEvent>();

  private _confirmationService: ConfirmationService = inject(ConfirmationService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this._confirm();
    }
  }

  onReject() {
    LogService.debug('[ConfirmDialogComponent] Reject action triggered', {
      callbackExists: !!this.rejectCallback,
      callback: this.rejectCallback,
    });
    this.rejectCallback.emit();
  }

  onAccept() {
    LogService.debug('[ConfirmDialogComponent] Accept action triggered', {
      callbackExists: !!this.acceptCallback,
      callback: this.acceptCallback,
    });
    this.acceptCallback.emit();
  }

  private _confirm() {
    this._confirmationService.confirm({
      header: this.header,
      message: this.message,
      accept: this.onAccept.bind(this),
      reject: this.onReject.bind(this),
      closeOnEscape: false,
    });
  }
}
