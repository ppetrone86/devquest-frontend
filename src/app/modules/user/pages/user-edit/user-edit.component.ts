import { NgIf } from '@angular/common';
import { Component, effect, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormViewportComponent } from '@components/shared/forms/form-viewport/form-viewport.component';
import { UserModel } from '@models/user.model';
import * as UserActions from '@modules/user/user.actions';
import { selectUserById } from '@modules/user/user.selectors';
import { UserService } from '@modules/user/user.service';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.component.html',
  imports: [BreadcrumbModule, SkeletonModule, ButtonModule, NgIf, Card, FormViewportComponent],
})
export default class UserEditComponent {
  private _route = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _store: Store = inject(Store);

  user: Signal<UserModel | undefined> = signal<UserModel | undefined>(undefined);
  isNewUser = false;
  breadcrumbItems: MenuItem[] = [];
  loading = true;

  constructor() {
    const id = this._route.snapshot.paramMap.get('id');

    if (id) {
      this.user = toSignal(this._store.select(selectUserById(+id)), { initialValue: undefined });

      effect(() => {
        const userData = this.user();

        // If user in not set
        if (!userData) {
          this._userService.getUserById(+id).subscribe((fetchedUser) => {
            this._store.dispatch(UserActions.fetchAllSuccess({ users: [fetchedUser], total: 1 }));
          });
        }

        this.loading = false;
        this.isNewUser = false;
        this.updateBreadcrumb(userData?.firstName + ' ' + userData?.lastName);
      });
    } else {
      this.isNewUser = true;
      this.loading = false;
      this.updateBreadcrumb();
    }
  }

  updateBreadcrumb(fullName?: string): void {
    this.breadcrumbItems = [
      { label: 'Utenti', routerLink: ['/private/users'], icon: 'pi pi-users' },
      { label: this.isNewUser ? 'Nuovo Utente' : `Modifica: ${fullName}`, icon: 'pi pi-user-edit' },
    ];
  }

  saveUser(): void {
    if (this.user()) {
      LogService.info('Utente salvato con successo!');
    }
  }
}
