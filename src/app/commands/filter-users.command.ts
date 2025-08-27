import { inject } from '@angular/core';
import { FormActionEvent } from '@components/shared/forms/models/form.model';
import * as UserActions from '@modules/user/user.actions';
import { Store } from '@ngrx/store';
import { Command } from './command.interface';

export class FilterUsersCommand implements Command<void> {
  private _store: Store = inject(Store);

  constructor(private _actionEvent: FormActionEvent) {}

  execute(): void {
    const filters = this._actionEvent.formData;
    this._store.dispatch(UserActions.fetchAll({ filters }));
  }
}
