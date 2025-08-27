import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionType, FormActionEvent } from '@components/shared/forms/models/form.model';
import { selectFormAction } from '@components/shared/forms/state/form-action-selectors';
import { DynamicTableModule } from '@components/shared/table/dynamic-table/dynamic-table.module';
import { TableConfig } from '@components/shared/table/models/table-config.model';
import { UserModel } from '@models/user.model';
import { selectorUserState, selectorUserState_total, selectorUserState_users } from '@modules/user/user.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LogService } from '@services/log.service';
import { FilterUsersCommand } from '@src/app/commands/filter-users.command';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { SkeletonModule } from 'primeng/skeleton';
import { distinctUntilChanged } from 'rxjs';
// TODO: Do we need all these imports? Check if we can remove unused ones.

@Component({
  selector: 'app-users-table',
  imports: [
    SkeletonModule,
    TranslateModule,
    FormsModule,
    CardModule,
    AvatarModule,
    MenuModule,
    PopoverModule,
    DynamicTableModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  users: UserModel[] = [];
  actions: MenuItem[] = [];
  totalUsers = 0;
  user!: UserModel;
  deleteProductDialog = false;

  isLoading = signal(false);

  usersTableConfig = signal<TableConfig>({
    title: 'components.userTable.title',
    searchPlaceholder: 'components.userTable.fields.search.placeholder',
    columns: [
      {
        field: 'fullName',
        header: 'components.userTable.columns.fullName',
        sortable: true,
        filterConfig: {
          visible: true,
          type: 'basic',
        },
        cellConfig: {
          imageField: 'image',
          labelField: 'fullName',
        },
      },
      {
        field: 'email',
        header: 'components.userTable.columns.email',
        sortable: true,
        filterConfig: {
          visible: true,
          type: 'basic',
        },
      },
      {
        field: 'gender',
        header: 'components.userTable.columns.gender',
        sortable: true,
      },
      {
        field: 'phone',
        header: 'components.userTable.columns.phone',
        sortable: true,
      },
      {
        field: 'birthDate',
        header: 'components.userTable.columns.birthDate',
        sortable: true,
      },
    ],
    data: [],
    paginator: true,
    rows: 15,
    globalFilterFields: ['fullName', 'email', 'gender', 'phone', 'birthDate'],
    addAction: {
      icon: 'pi pi-plus',
      label: 'components.userTable.actions.newUser',
      permissions: ['entities.users.create'],
      callback: () => this.newUser(),
    },
    actions: [
      {
        icon: 'pi pi-pencil',
        permissions: ['entities.users.update'],
        callback: (row) => this.editUser(row),
      },
      {
        icon: 'pi pi-trash',
        permissions: ['entities.users.delete'],
        callback: (row) => this.deleteUser(row),
        severity: 'danger',
      },
    ],
    searchFormEntity: 'users-search',
  });

  constructor() {
    effect(() => {
      this.isLoading.set(true);

      this._store.select(selectorUserState_users).subscribe((data) => {
        this.usersTableConfig.update((currentConfig) => ({
          ...currentConfig,
          data: data.map((user) => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`,
          })),
        }));
      });

      this._store.select(selectorUserState_total).subscribe((total) => {
        this.totalUsers = total;
      });

      this._store.select(selectorUserState).subscribe((state) => {
        this.isLoading.set(!state.loaded);
      });
    });
  }

  ngOnInit(): void {
    this._store
      .select(selectFormAction)
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return JSON.stringify(prev) == JSON.stringify(curr);
        })
      )
      .subscribe((action) => {
        if (action) {
          this.onFormAction(action);
        }
      });
  }

  onFormAction(action: FormActionEvent) {
    if (action.actionType === ActionType.SUBMIT) {
      const filterCommand = new FilterUsersCommand(action);
      filterCommand.execute();

      LogService.debug('UserTableComponent.onFormAction', action);
    }
  }

  editUser(user: UserModel): void {
    this._router.navigate(['/private/users/edit', user.id]);
  }

  newUser(): void {
    this._router.navigate(['/private/users/new']);
  }

  deleteUser(currentUser: UserModel) {
    this.deleteProductDialog = true;
    this.user = { ...currentUser };
  }
}
