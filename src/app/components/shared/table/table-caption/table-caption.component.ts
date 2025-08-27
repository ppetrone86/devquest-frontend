import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormViewportComponent } from '@components/shared/forms/form-viewport/form-viewport.component';
import { PermissionedDirective } from '@components/shared/permission/permissioned.directive';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-table-caption',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputText,
    TranslatePipe,
    PopoverModule,
    FormViewportComponent,
    PermissionedDirective,
  ],
  templateUrl: './table-caption.component.html',
})
export class TableCaptionComponent {
  @Input() title = '';
  @Input() addActionLabel = '';
  @Input() addActionPermissions: string[] = [];
  @Input() hasSearchForm = false;
  @Input() searchPlaceholder = '';
  @Input() searchFormEntity: any;

  @Output() addAction = new EventEmitter<void>();
  @Output() searchAction = new EventEmitter<string>();
}
