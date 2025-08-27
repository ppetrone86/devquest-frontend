export interface UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  image: string;
  phone: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  cart: {
    productId: number;
    quantity: number;
  }[];
  wishlist: number[];
  lastLogin: string;
  createdAt: string;
}
