import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IProductPayload } from '../models/IProduct';
import { BACKEND_URL } from '../environments/urlConfig';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${BACKEND_URL}/api/product`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }
  getMyProducts(userId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + '/my-products/' + userId);
  }
  updateProductAvailability(
    productId: number,
    isAvailable: boolean
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${productId}/availability`,
      isAvailable
    );
  }
  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.apiUrl + `/${productId}`);
  }
  updateProduct(
    productId: number,
    productPayload: IProductPayload
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, productPayload);
  }
}
