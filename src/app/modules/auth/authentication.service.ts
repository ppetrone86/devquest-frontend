import { inject, Injectable } from '@angular/core';
import { UserModel } from '@models/user.model';
import * as AuthActions from '@modules/auth/auth.actions';
import { selectorAuthState } from '@modules/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api/api.service';
import { WhiteLabelProvider } from '@services/api/providers/white-label/white-label-provider';
import { LogService } from '@services/log.service';
import { PKCEService } from '@services/pkce.service';
import { UtilsService } from '@services/utils.service';
import { Observable, take } from 'rxjs';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  protected provider = inject(WhiteLabelProvider);

  private _utils: UtilsService = inject(UtilsService);

  private _pkceService: PKCEService = inject(PKCEService);
  private _store: Store = inject(Store);

  private _refreshTokenTimer: any | null;

  login(): void {}

  logout(data: any): Observable<UserModel> {
    this.clearTokenRefresh();

    return this.provider.oauth2.logout<UserModel>(data?.email);
  }

  exchangeToken(code: string, codeVerifier: string): Observable<any> {
    return this.provider.oauth2.exchangeToken<any>(code, codeVerifier);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.provider.oauth2.refreshToken<any>(refreshToken);
  }

  scheduleTokenRefresh(expiresIn: number, refreshToken: string): void {
    if (this._refreshTokenTimer) {
      clearTimeout(this._refreshTokenTimer);
    }

    const refreshTime: number = (expiresIn - this.provider.oauth2.refreshTokenOffset) * 1000;

    this._refreshTokenTimer = setTimeout(() => {
      this._store.dispatch(AuthActions.refreshTokenProactive({ refreshToken }));
    }, refreshTime);

    LogService.debug(`Token refresh scheduled in ${refreshTime / 1000} seconds`);
  }

  restoreTokenRefreshTimer(): void {
    this._store
      .select(selectorAuthState)
      .pipe(take(1))
      .subscribe((authState) => {
        const { bearerRefreshToken, expiresInTimestamp } = authState;

        if (!bearerRefreshToken || !expiresInTimestamp) {
          return;
        }

        const now = Math.floor(Date.now() / 1000);
        const timeLeft = expiresInTimestamp - now;

        if (timeLeft > 0) this.scheduleTokenRefresh(timeLeft, bearerRefreshToken);
      });
  }

  clearTokenRefresh(): void {
    if (this._refreshTokenTimer) {
      clearTimeout(this._refreshTokenTimer);
      this._refreshTokenTimer = null;
    }
  }

  initializeAuthState(): AuthState {
    const codeVerifier = this._pkceService.getCodeVerifier();
    const codeChallenge = this._pkceService.getCodeChallenge(codeVerifier);
    const nonce = this._utils.randomString();
    const state = this._utils.randomString();

    return {
      permissions: [],
      codeVerifier: codeVerifier,
      codeChallenge: codeChallenge,
      state: state,
      nonce: nonce,
    };
  }

  buildAuthServerUrl(authState: AuthState) {
    return this.provider.oauth2.buildAuthServerUrl(authState);
  }
}
