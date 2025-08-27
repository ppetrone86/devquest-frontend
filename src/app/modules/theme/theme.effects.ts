import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services/local-storage.service';
import { tap, withLatestFrom } from 'rxjs';
import { change, infer, init, set } from './theme.actions';
import { selectorThemeState, THEME_STORAGE_KEY } from './theme.selectors';
import { ColorScheme, ThemeKey, THEMES, ThemeState } from './theme.state';

@Injectable()
export class ThemeEffects {
  private _store: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _localStorage: LocalStorageService = inject(LocalStorageService);

  init = createEffect(
    () =>
      this._actions$.pipe(
        ofType(init),
        tap(() => {
          const state: ThemeState | null = this._localStorage.getItem(THEME_STORAGE_KEY);
          if (state) this._store.dispatch(set({ state }));
          else this._store.dispatch(infer());
        })
      ),
    { dispatch: false }
  );

  infer = createEffect(
    () =>
      this._actions$.pipe(
        ofType(infer),
        tap(() => {
          if (typeof document === 'undefined') return;

          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const colorScheme = prefersDark ? ColorScheme.DARK : ColorScheme.LIGHT;
          const result = Object.entries(THEMES).find(([key, t]) => (t.colorScheme === colorScheme ? key : null));
          if (result) this._store.dispatch(set({ state: { key: result[0] as ThemeKey } }));
        })
      ),
    { dispatch: false }
  );

  set = createEffect(
    () =>
      this._actions$.pipe(
        ofType(set),
        tap(({ state }) => {
          this._store.dispatch(change({ key: state.key }));
        })
      ),
    { dispatch: false }
  );

  change = createEffect(
    () =>
      this._actions$.pipe(
        ofType(change),
        withLatestFrom(this._store.select(selectorThemeState)),
        tap(([_action, state]) => {
          if (typeof document === 'undefined') return;

          const element = document.querySelector('html');
          element?.setAttribute('data-theme', state.key);

          // Store the theme in local storage
          this._localStorage.setItem(THEME_STORAGE_KEY, state);
        })
      ),
    { dispatch: false }
  );
}
