import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, linkedSignal, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ColumnFilterComponent } from '@components/shared/table/column-filter/column-filter.component';
import { ActionConfig, initialTableConfigState, TableConfig } from '@components/shared/table/models/table-config.model';
import { TableActionsComponent } from '@components/shared/table/table-actions/table-actions.component';
import { TableCaptionComponent } from '@components/shared/table/table-caption/table-caption.component';
import { PermissionService } from '@modules/auth/permission.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dynamic-table',
  imports: [
    CommonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    TranslatePipe,
    AvatarModule,
    PopoverModule,
    MenuModule,
    SkeletonModule,
    TableCaptionComponent,
    TableActionsComponent,
    ColumnFilterComponent,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  standalone: true,
})
export class DynamicTableComponent implements OnChanges {
  @Input() config!: TableConfig;
  @Input() loading?: boolean = false;

  private _permissionService = inject(PermissionService);
  private _userPermissions = this._permissionService.userPermissions();

  tableConfig = signal<TableConfig>(initialTableConfigState);

  tableData = linkedSignal(() => this.tableConfig().data || []);
  paginator = computed(() => this.tableConfig().paginator || false);
  rows = linkedSignal(() => this.tableConfig().rows || 20);
  globalFilterFields = computed(() => this.tableConfig().globalFilterFields || []);
  title = linkedSignal(() => this.tableConfig().title || '');
  searchPlaceholder = computed(() => this.tableConfig().searchPlaceholder || '');
  hasSearchFormEntity = computed(() => !!this.tableConfig().searchFormEntity);
  searchFormEntity = computed(() => this.tableConfig().searchFormEntity || '');
  addAction = computed(() => this.tableConfig().addAction);
  addActionLabel = computed(() => this.tableConfig().addAction?.label || '');
  addActionPermissions = computed(() => this.tableConfig().addAction?.permissions || []);
  columns = computed(() => this.tableConfig().columns || []);
  actions = computed(() => {
    const originalActions = this.tableConfig().actions || [];
    // Keep only the actions for which the active user has the required permissions
    return originalActions.filter((a) =>
      this._permissionService.hasPermissionSync(a.permissions, this._userPermissions)
    );
  });
  hasActions = computed(() => !!this.actions().length);
  columnCount = computed(() => (this.hasActions() ? this.columns().length + 1 : this.columns().length));
  hasBasicFilters = computed(() =>
    this.columns().some((col) => col.filterConfig?.visible && col.filterConfig.type === 'basic')
  );
  isLoading = signal<boolean>(false);

  ngOnChanges(_changes: SimpleChanges) {
    if (this.config) {
      this.tableConfig.set(this.config);
      this.isLoading.set(this.loading || false);
    }
  }

  onAction(action?: ActionConfig | undefined, row?: any): void {
    if (action?.callback) {
      action.callback(row);
    }
  }
}
