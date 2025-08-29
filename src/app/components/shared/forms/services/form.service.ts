import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormConfig } from '@components/shared/forms/models/form.model';
import { LogService } from '@services/log.service';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _dryRun: boolean = environment.dryRun;
  private _http: HttpClient = inject(HttpClient);

  private _baseUrl: string = environment.api.devQuest.url;

  private _defaultMockForm = 'assets/data/mock/forms/form-user-registration.json';
  private _mockForms = new Map<string, string>([
    ['user-registration', 'assets/data/mock/forms/form-user-registration.json'],
    ['user-details', 'assets/data/mock/forms/form-user-details.json'],
    ['users-search', 'assets/data/mock/forms/form-users-search.json'],
    ['event-registration', 'assets/data/mock/forms/form-event-registration.json'],
    ['job-application', 'assets/data/mock/forms/form-job-application.json'],
    ['expense-report', 'assets/data/mock/forms/form-expense-report.json'],
    ['product-feedback', 'assets/data/mock/forms/form-product-feedback.json'],
    ['currency-input', 'assets/data/mock/forms/form-currency-input.json'],
    ['jet-search', 'assets/data/mock/forms/form-jet-search.json'],
  ]);

  // TODO: Lorenzo, implement a function to convert the JSON response into a valid FormConfig.
  public get(entity: string): Observable<FormConfig> {
    this._dryRun = true;

    LogService.debug('FormService.get.entity', entity);

    const url: string = this._dryRun
      ? this._mockForms.get(entity) || this._defaultMockForm
      : `${this._baseUrl}/entities/${entity}`;

    LogService.debug('Url', url);

    return this._http.get<FormConfig>(url);
  }
}
