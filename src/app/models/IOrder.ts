import { IAddress } from './IAddress';
import { ILoggedUser } from './ILoggedUser';
import { IProduct } from './IProduct';

export interface IOrder {
  id: number;
  orderNumber: string;
  orderDate: string;
  bsrCode: string;
  receiptDate: string;
  status: string;
}
export interface OrderInfoDto {
  orderId: number;
  orderStatus: string;
  orderDate: string;
  customer: Customer;
  address: Address;
  products: ProductDto[];
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: {
    companyName: string;
    cui: string;
    registrationNumber: string;
  };
}

export interface Address {
  city: string;
  details: string;
  contactPhoneNumber: string;
}

export interface ProductDto {
  productId: number;
  name: string;
  quantity: number;
}
