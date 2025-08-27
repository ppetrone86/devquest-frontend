import { inject, Injectable } from '@angular/core';
import { OrderModel } from '@models/order.model';
import { ApiService } from '@services/api/api.service';
import { DummyProvider } from '@services/api/providers/dummy/dummy-provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiService {
  protected provider = inject(DummyProvider);

  fetchAll(): Observable<OrderModel> {
    return this.provider.carts.fetchAll<OrderModel>();
  }
}
