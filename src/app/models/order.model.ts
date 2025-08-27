import { ProductModel } from '@models/product.model';

export interface OrderModel {
  date: any;
  id: number;
  products: ProductModel[];
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
}

export interface OrderModelByMonth {
  month: string;
  totalOrders: number;
}

export interface OrderModelByDate {
  date: string;
  totalOrders: number;
}

export interface OrderModelDailyEarning {
  date: string;
  totalEarning: number;
}

export interface OrderModelDailyProducts {
  date: string;
  totalProducts: number;
}
