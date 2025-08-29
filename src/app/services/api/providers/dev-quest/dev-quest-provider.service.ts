import { inject, Injectable } from '@angular/core';
import { DevQuestAuth2Provider } from '@services/api/providers/dev-quest/dev-quest-auth-provider';
import { DevQuestGameProvider } from '@services/api/providers/dev-quest/dev-quest-game-provider.service';
import { DevQuestUserProvider } from '@services/api/providers/dev-quest/dev-quest-user-provider.service';

@Injectable({
  providedIn: 'root',
})
export class DevQuestProvider {
  private _devQuestAuth2Provider = inject(DevQuestAuth2Provider);
  private _devQuestUserProvider = inject(DevQuestUserProvider);
  private _devQuestGameProvider = inject(DevQuestGameProvider);

  /**
   * Provides access to OAuth2 authentication services.
   */
  public get oauth2(): DevQuestAuth2Provider {
    return this._devQuestAuth2Provider;
  }

  /**
   * Provides access to user services.
   */
  public get user(): DevQuestUserProvider {
    return this._devQuestUserProvider;
  }

  /**
   * Provides access to game services.
   */
  public game(): DevQuestGameProvider {
    return this._devQuestGameProvider;
  }
}
