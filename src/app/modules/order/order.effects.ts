import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { fetchAll, fetchAllError, fetchAllSuccess } from './order.actions';
import { selectorOrderState_orders } from './order.selectors';
import { OrderService } from './order.service';

@Injectable()
export class OrderEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _orderService: OrderService = inject(OrderService);
  private _router: Router = inject(Router);

  private _translate: TranslateService = inject(TranslateService);

  fetchAll = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAll),
        mergeMap((action) => {
          const { route } = action;
          return this._orderService.fetchAll().pipe(
            map((data: any) => {
              const orders = data?.carts;
              const total = data?.total;
              return fetchAllSuccess({ orders, total, route });
            }),
            catchError((err: any) => of(fetchAllError({ error: err.message })))
          );
        })
      ),
    { dispatch: true }
  );

  fetchAllSuccess = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAllSuccess),
        withLatestFrom(this._store.select(selectorOrderState_orders)),
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
