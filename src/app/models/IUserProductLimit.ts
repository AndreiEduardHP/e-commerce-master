export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  isDisabled: boolean;
  rol: string;
  dateAccountCreation: string;
  languagePreference: string;
  credit: number;
  profilePicture: string;
  orders: null;
  companyId: number;
  company: null;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  stoc: number;
  available: boolean;
  createdByUserId: number;
  productCod: string;
  internalClientCod: string;
}

export interface IUserProductLimit {
  id: number;
  userId: number;
  productId: number;
  limit: number;
  count: number;
  user: User;
  product: Product;
}
export interface IUserProductLimitPayLoad {
  userId: number;
  productId: number;
  limit: number;
  count: number;
}
