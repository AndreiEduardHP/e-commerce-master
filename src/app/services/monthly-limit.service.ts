import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IUserProductLimit,
  IUserProductLimitPayLoad,
} from '../models/IUserProductLimit';
import { Observable, map } from 'rxjs';
import { BACKEND_URL } from '../environments/urlConfig';

@Injectable({
  providedIn: 'root',
})
export class MonthlyLimitService {
  constructor(private http: HttpClient) {}

  getLimits(): Observable<IUserProductLimit[]> {
    return this.http.get<IUserProductLimit[]>(
      `${BACKEND_URL}/api/userproductlimit`
    );
  }
  addLimit(
    limit: IUserProductLimitPayLoad
  ): Observable<IUserProductLimitPayLoad> {
    return this.http.post<IUserProductLimitPayLoad>(
      `${BACKEND_URL}/api/userproductlimit`,
      limit
    );
  }
  editLimit(limitId: number, newLimit: number): Observable<any> {
    const payload: any = {
      limit: newLimit,
    };
    return this.http.put<IUserProductLimitPayLoad>(
      `${BACKEND_URL}/api/userproductlimit/${limitId}/limit`,
      payload
    );
  }
  getLimitsForUser(userId: number): Observable<any[]> {
    return this.getLimits().pipe(
      map((limits) => limits.filter((limit) => limit.userId === userId))
    );
  }
  updateCount(
    productId: number,
    userId: number | undefined,
    count: number
  ): Observable<any> {
    const body = { productId: productId, userId: userId, count: count };
    return this.http.post(
      `${BACKEND_URL}/api/UserProductLimit/UpdateCount`,
      body
    );
  }
  deleteLimit(limitId: number): Observable<any> {
    const url = `${BACKEND_URL}/api/UserProductLimit/DeleteLimit/${limitId}`;
    return this.http.delete<any>(url);
  }
}
