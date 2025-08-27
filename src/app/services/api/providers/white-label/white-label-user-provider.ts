import { Injectable } from '@angular/core';
import { WhiteLabelBaseProvider } from '@services/api/providers/white-label/white-label-base-provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelUserProvider extends WhiteLabelBaseProvider {
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
