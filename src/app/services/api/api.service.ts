import { Injectable } from '@angular/core';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';
import { DevQuestProvider } from '@services/api/providers/dev-quest/dev-quest-provider.service';
import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService extends HttpService {
  protected abstract readonly provider: DevQuestProvider | DummyProvider;
}
