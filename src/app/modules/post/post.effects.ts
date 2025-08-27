import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { fetchAll, fetchAllError, fetchAllSuccess } from './post.actions';
import { selectorPostState_posts } from './post.selectors';
import { PostService } from './post.service';

@Injectable()
export class PostEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _postService: PostService = inject(PostService);
  private _router: Router = inject(Router);

  fetchAll = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchAll),
        mergeMap((action) => {
          const { route } = action;
          return this._postService.fetchAll().pipe(
            map((data: any) => {
              const posts = data?.posts;
              const total = data?.total;
              return fetchAllSuccess({ posts, total, route });
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
        withLatestFrom(this._store.select(selectorPostState_posts)),
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
