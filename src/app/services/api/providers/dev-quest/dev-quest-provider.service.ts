import { inject, Injectable } from '@angular/core';
import { DevQuestChatProvider } from '@services/api/providers/dev-quest/dev-quest-chat-provider.service';
import { DevQuestUserProvider } from '@services/api/providers/dev-quest/dev-quest-user-provider.service';
import { DevQuestAuth2Provider } from '@services/api/providers/dev-quest/dev-quest-auth-provider';

@Injectable({
  providedIn: 'root',
})
export class DevQuestProvider {
  private _devQuestProChatProvider = inject(DevQuestChatProvider);
  private _devQuestProAuth2Provider = inject(DevQuestAuth2Provider);
  private _devQuestProUserProvider = inject(DevQuestUserProvider);

  /**
   * Provides access to OAuth2 authentication services.
   */
  public get oauth2(): DevQuestAuth2Provider {
    return this._devQuestProAuth2Provider;
  }

  /**
   * Provides access to chatbot services.
   */
  public get chatbot(): DevQuestChatProvider {
    return this._devQuestProChatProvider;
  }

  /**
   * Provides access to user services.
   */
  public get user(): DevQuestUserProvider {
    return this._devQuestProUserProvider;
  }
}
