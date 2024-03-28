import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../environments/urlConfig';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${BACKEND_URL}/api/orders`;

  constructor(private http: HttpClient) {}

  addOrder(order: any) {
    return this.http.post(this.apiUrl, order);
  }
  getOrders(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map((orders: any[]) =>
        orders.map((order) => ({
          id: `#${order.id}`,
          orderNumber: order.id.toString(),
          orderDate: new Date(order.orderDate).toLocaleDateString('ro-RO'),
          codBSR: order.codBSR,
          receiptDate: 'jj/mm/aaaa',
          status: order.orderStatus,
        }))
      )
    );
  }
  getProductsByOrderId(orderId: number) {
    return this.http.get<any[]>(
      `${BACKEND_URL}/api/product/order-details/${orderId}`
    );
  }
  getComenziClienti(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BACKEND_URL}/api/client/${userId}`);
  }
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/status`;
    const body = { newStatus: status };

    return this.http.put(url, body);
  }
}
