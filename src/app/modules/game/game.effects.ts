import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fetchAll, fetchAllError, fetchAllSuccess } from '@modules/user/user.actions';
import { selectorUserState, selectorUserState_users } from '@modules/user/user.selectors';
import { UserService } from '@modules/user/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

@Injectable()
export class GameEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _userService: UserService = inject(UserService);
  private _router: Router = inject(Router);

  fetchAll = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAll),
        withLatestFrom(this._store.select(selectorUserState)), // Check the current status
        mergeMap(([action, state]) => {
          if (state.loaded) return of();
          const filters = action.filters || state.filters;
          const sortField = action.sortField || state.sortField;
          const sortOrder = action.sortOrder || state.sortOrder;

          return this._userService.fetchUsers(filters, sortField, sortOrder).pipe(
            map((data) => fetchAllSuccess({ users: data.users, total: data.total })),
            catchError((err) => of(fetchAllError({ error: err.message })))
          );
        })
      ),
    { dispatch: true }
  );

  fetchAllSuccess = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAllSuccess),
        withLatestFrom(this._store.select(selectorUserState_users)),
        tap(([action]) => {
          const { route } = action;
          if (route) {
            this._router.navigateByUrl(route);
          }
          return of();
        })
      ),
    { dispatch: false }
  );

  fetchAllError = createEffect(() => this._actions$.pipe(ofType(fetchAllError)), { dispatch: false });
}
