import { Injectable } from '@angular/core';
import { DevQuestBaseProvider } from '@services/api/providers/dev-quest/dev-quest-base-provider.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevQuestUserProvider extends DevQuestBaseProvider {
  constructor() {
    super();
    this.endpoint = 'rest/services/user';
  }

  /**
   * Retrieves the details of the currently authenticated user.
   *
   * @returns Observable<T> containing the user details.
   */
  details<T>(): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${this.endpoint}/details`, {});
  }
}
