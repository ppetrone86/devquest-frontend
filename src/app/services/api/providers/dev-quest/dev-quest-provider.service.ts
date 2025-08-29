import { inject, Injectable } from '@angular/core';
import { DevQuestChatProvider } from '@services/api/providers/white-label/dev-quest-chat-provider.service';
import { DevQuestUserProvider } from '@services/api/providers/white-label/dev-quest-user-provider.service';
import { DevQuestAuth2Provider } from '@services/api/providers/white-label/dev-quest-auth-provider';

@Injectable({
  providedIn: 'root',
})
export class DevQuestProvider {
  private _whiteLabelProChatProvider = inject(DevQuestChatProvider);
  private _whiteLabelProAuth2Provider = inject(DevQuestAuth2Provider);
  private _whiteLabelProUserProvider = inject(DevQuestUserProvider);

  /**
   * Provides access to OAuth2 authentication services.
   */
  public get oauth2(): DevQuestAuth2Provider {
    return this._whiteLabelProAuth2Provider;
  }

  /**
   * Provides access to chatbot services.
   */
  public get chatbot(): DevQuestChatProvider {
    return this._whiteLabelProChatProvider;
  }

  /**
   * Provides access to user services.
   */
  public get user(): DevQuestUserProvider {
    return this._whiteLabelProUserProvider;
  }
}
