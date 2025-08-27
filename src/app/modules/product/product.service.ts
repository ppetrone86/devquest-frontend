import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  protected provider = inject(DummyProvider);

  fetchAll(): Observable<any> {
    return this.provider.products.fetchAll();
  }
}
