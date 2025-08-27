import { inject, Injectable } from '@angular/core';
import { WhiteLabelAuth2Provider } from '@services/api/providers/white-label/white-label-auth-provider';
import { WhiteLabelChatProvider } from '@services/api/providers/white-label/white-label-chat-provider';
import { WhiteLabelUserProvider } from '@services/api/providers/white-label/white-label-user-provider';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelProvider {
  private _whiteLabelProChatProvider = inject(WhiteLabelChatProvider);
  private _whiteLabelProAuth2Provider = inject(WhiteLabelAuth2Provider);
  private _whiteLabelProUserProvider = inject(WhiteLabelUserProvider);

  /**
   * Provides access to OAuth2 authentication services.
   */
  public get oauth2(): WhiteLabelAuth2Provider {
    return this._whiteLabelProAuth2Provider;
  }

  /**
   * Provides access to chatbot services.
   */
  public get chatbot(): WhiteLabelChatProvider {
    return this._whiteLabelProChatProvider;
  }

  /**
   * Provides access to user services.
   */
  public get user(): WhiteLabelUserProvider {
    return this._whiteLabelProUserProvider;
  }
}
