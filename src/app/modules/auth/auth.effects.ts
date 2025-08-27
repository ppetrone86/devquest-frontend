import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from '@components/layouts/services/app-settings.service';
import { ErrorConstants } from '@components/shared/notifications/error.contants';
import { showErrorToast } from '@components/shared/notifications/toast/toast.actions';
import { UserService } from '@modules/user/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LogService } from '@services/log.service';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import {
  exchangeToken,
  exchangeTokenSuccess,
  initializeAuthState,
  initializeAuthStateSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutSuccess,
  redirectToAuth,
  refreshTokenProactive,
  updateTokenSuccess,
} from './auth.actions';
import { selectorAuthState } from './auth.selectors';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthEffects {
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);
  private _actions$: Actions = inject(Actions);
  private _appSettings: AppSettingsService = inject(AppSettingsService);
  private _authenticationService: AuthenticationService = inject(AuthenticationService);
  private _userService: UserService = inject(UserService);

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(login),
      withLatestFrom(this._store.select(selectorAuthState)),
      mergeMap(([_action, authState]) => {
        if (authState && authState.bearerAuthorizationToken) {
          return of();
        }

        return of(initializeAuthState());
      })
    )
  );

  initializeAuthState$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initializeAuthState),
      mergeMap(() => {
        const { codeVerifier, codeChallenge, state, nonce } = this._authenticationService.initializeAuthState();

        if (!codeVerifier || !codeChallenge || !state || !nonce) {
          return of(
            loginError({
              error: ErrorConstants.PKCE_GENERATION_FAILED,
            })
          );
        }

        return of(initializeAuthStateSuccess({ codeVerifier, codeChallenge, state, nonce }));
      })
    )
  );

  initializeAuthStateSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initializeAuthStateSuccess),
      withLatestFrom(this._store.select(selectorAuthState)),
      map(([_action, _state]) => {
        return redirectToAuth();
      })
    )
  );

  redirectToAuth$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(redirectToAuth),
        withLatestFrom(this._store.select(selectorAuthState)),
        mergeMap(([_action, state]) => {
          const authenticationUrl = this._authenticationService.buildAuthServerUrl(state);

          if (!authenticationUrl) {
            return of(
              loginError({
                error: ErrorConstants.AUTH_PROVIDER_CONNECTION_FAILED,
              })
            );
          }

          window.location.href = authenticationUrl;
          return of();
        })
      ),
    { dispatch: false }
  );

  exchangeToken$ = createEffect(() =>
    this._actions$.pipe(
      ofType(exchangeToken),
      withLatestFrom(this._store.select(selectorAuthState)),
      mergeMap(([_action, state]) => {
        const code: string | null = state.authorizationToken || null;
        const codeVerifier: string | null = state.codeVerifier || null;

        if (code && codeVerifier) {
          return this._authenticationService.exchangeToken(code, codeVerifier).pipe(
            map((response) => {
              const { access_token, refresh_token, expires_in, token_type } = response;

              const expiresInTimestamp = Math.floor(Date.now() / 1000) + expires_in;

              return exchangeTokenSuccess({
                bearerToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                expiresInTimestamp: expiresInTimestamp,
                tokenType: token_type,
              });
            }),
            catchError((error) => {
              return of(loginError({ error: error.message }));
            })
          );
        } else {
          return of();
          // return of(loginError({ error: ErrorConstants.CODE_OR_VERIFIER_MISSING }));
        }
      })
    )
  );

  exchangeTokenSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(exchangeTokenSuccess),
      withLatestFrom(this._store.select(selectorAuthState)),
      mergeMap(([{ refreshToken, expiresIn }]) => {
        this._authenticationService.scheduleTokenRefresh(expiresIn, refreshToken);
        return this._userService.getUserDetails().pipe(
          map(({ user, sections }) => {
            const permissions = [...new Set(UserService.flattenSections(sections))];
            return loginSuccess({ user, permissions });
          })
        );
      })
    )
  );

  refreshTokenProactive$ = createEffect(() =>
    this._actions$.pipe(
      ofType(refreshTokenProactive),
      mergeMap(({ refreshToken }) =>
        this._authenticationService.refreshToken(refreshToken).pipe(
          map((response) => {
            const { access_token, refresh_token, expires_in } = response;
            this._authenticationService.scheduleTokenRefresh(expires_in, refresh_token);
            return updateTokenSuccess({ bearerToken: access_token, refreshToken: refresh_token });
          }),
          catchError((err) => {
            LogService.error('Error refreshing token:', err);
            return of(logout());
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccess),
        withLatestFrom(this._store.select(selectorAuthState)),
        map(() => {
          this._router.navigateByUrl(this._appSettings.fallbackAfterLogin); //TODO: set this as default
        })
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginError),
        tap((action) => {
          this._showErrorToast(action.error);
        })
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logout),
      withLatestFrom(this._store.select(selectorAuthState)),
      mergeMap(([_action, authState]) => {
        const logoutProcess$ = authState.isAuthenticated
          ? this._authenticationService.logout(authState.user).pipe(
              catchError((err) => {
                LogService.warn('Logout call failed', err);
                return of();
              })
            )
          : of();

        return logoutProcess$.pipe(
          map(() => logoutSuccess()),
          catchError(() => of(logoutSuccess()))
        );
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          this._router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  private _showErrorToast(errorMessage: string) {
    this._store.dispatch(
      showErrorToast({
        toast: {
          detail: errorMessage,
        },
      })
    );
  }
}
