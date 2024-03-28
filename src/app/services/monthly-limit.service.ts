import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IUserProductLimit,
  IUserProductLimitPayLoad,
} from '../models/IUserProductLimit';
import { Observable } from 'rxjs';
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
}
