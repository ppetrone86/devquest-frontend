import { Injectable } from '@angular/core';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';
import { WhiteLabelProvider } from '@services/api/providers/white-label/white-label-provider';
import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService extends HttpService {
  protected abstract readonly provider: WhiteLabelProvider | DummyProvider;
}
