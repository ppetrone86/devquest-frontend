import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '@models/user.model';
import { UsersTableComponent } from '@modules/user/components/users-table/users-table.component';
import * as UserActions from '@modules/user/user.actions';
import {
  selectorUserState_filters,
  selectorUserState_total,
  selectorUserState_users,
} from '@modules/user/user.selectors';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users-page',
  imports: [TranslateModule, UsersTableComponent],
  templateUrl: './users-page.component.html',
  standalone: true,
})
export default class UsersPageComponent implements OnInit {
  private _store: Store = inject(Store);

  users: UserModel[] = [];
  totalUsers = 0;
  columnFilters: Record<string, any> = {};

  ngOnInit(): void {
    this._store.select(selectorUserState_users).subscribe((data) => {
      this.users = data;
    });

    this._store.select(selectorUserState_total).subscribe((total) => {
      this.totalUsers = total;
    });

    this._store.select(selectorUserState_filters).subscribe((filters) => {
      this.columnFilters = { ...filters };
      this.fetchUsersWithFilters();
    });
  }

  fetchUsersWithFilters(): void {
    const filters = {
      ...this.columnFilters,
    };

    this._store.dispatch(UserActions.fetchAll({ filters }));
  }
}
