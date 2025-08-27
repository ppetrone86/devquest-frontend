import { OrderModel } from '@models/order.model';

export interface OrderState {
  orders: OrderModel[];
  total: number;
}
