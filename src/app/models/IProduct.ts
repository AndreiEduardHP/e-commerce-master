export interface IProduct {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  description: string;
  available: boolean;
  quantity: number;
  createdByUserId: number;
  productCod: string;
  internalClientCod: string;
  category: string;
  stoc: number;
  limit: number;
}
export interface IProductPayload {
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  stoc: number;
  available: boolean;
  productCod: string;
  internalClientCod: string;
}
