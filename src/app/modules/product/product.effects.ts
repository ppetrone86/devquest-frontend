import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { fetchAll, fetchAllError, fetchAllSuccess } from './product.actions';
import { selectorProductState_products } from './product.selectors';
import { ProductService } from './product.service';

@Injectable()
export class ProductEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _productService: ProductService = inject(ProductService);
  private _router: Router = inject(Router);

  fetchAll = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAll),
        mergeMap((action) => {
          const { route } = action;
          return this._productService.fetchAll().pipe(
            map((data: any) => {
              const products = data?.products;
              const total = data?.total;
              return fetchAllSuccess({ products, total, route });
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
        withLatestFrom(this._store.select(selectorProductState_products)),
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
