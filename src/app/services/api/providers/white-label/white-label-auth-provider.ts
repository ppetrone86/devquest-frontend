import { Injectable } from '@angular/core';
import { AuthState } from '@modules/auth/auth.state';
import { WhiteLabelBaseProvider } from '@services/api/providers/white-label/white-label-base-provider';
import { LogService } from '@services/log.service';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelAuth2Provider extends WhiteLabelBaseProvider {
  private readonly _clientId: string = environment.api.whiteLabel.clientId;
  private readonly _redirectUri: string = environment.api.whiteLabel.redirectURI;
  private readonly _refreshTokenOffset = environment.api.whiteLabel.refreshTokenOffset;

  constructor() {
    super();
    this.endpoint = 'oauth2';
  }

  /**
   * Gets the refresh token offset value.
   */
  public get refreshTokenOffset(): number {
    return this._refreshTokenOffset;
  }

  /**
   * Logs out a user.
   * @param email User's email.
   * @returns Observable of the response.
   */
  logout<T>(email: string): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/logout`, { email });
  }

  /**
   * Exchanges an authorization code for an access token.
   * @param code Authorization code received from the authentication server.
   * @param codeVerifier Code verifier for PKCE flow.
   * @returns Observable containing the token response.
   */
  exchangeToken<T>(code: string, codeVerifier: string): Observable<T> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: this._redirectUri,
      code,
      code_verifier: codeVerifier,
    });

    const tokenUrl = `${this.baseUrl}/${this.endpoint}/token`;
    LogService.debug('WhiteLabelAuth2Provider.exchangeToken.tokenUrl', tokenUrl);

    return this.httpService.post<T>(tokenUrl, body.toString());
  }

  /**
   * Refreshes an expired access token.
   * @param refreshToken The refresh token.
   * @returns Observable containing the new token response.
   */
  refreshToken<T>(refreshToken: string): Observable<T> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const tokenUrl = `${this.baseUrl}/${this.endpoint}/token`;
    LogService.debug('WhiteLabelAuth2Provider.refreshToken.tokenUrl', tokenUrl);

    return this.httpService.post<T>(tokenUrl, body.toString());
  }

  /**
   * Builds the authentication server URL for user login.
   * @param authState Authentication state containing required parameters.
   * @returns Constructed authentication URL.
   */
  buildAuthServerUrl(authState: AuthState): string {
    const params: Record<string, string> = {
      redirect_uri: this._redirectUri,
      client_id: this._clientId,
      scope: '',
      response_type: 'code',
      response_mode: 'query',
      code_challenge_method: 'S256',
      code_challenge: authState.codeChallenge || '',
      state: authState.state || '',
      nonce: authState.nonce || '',
    };

    const queryString = new URLSearchParams(params).toString();
    return `${this.baseUrl}/${this.endpoint}/authorize?${queryString}`;
  }
}
