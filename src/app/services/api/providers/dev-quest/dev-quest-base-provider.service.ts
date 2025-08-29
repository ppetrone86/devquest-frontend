import { Injectable } from '@angular/core';
import { ApiProvider } from '@services/api/providers/api-provider';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevQuestBaseProvider extends ApiProvider {
  // Base URL for White Label API
  protected readonly baseUrl = `${environment.api.whiteLabel.url}`;
}
