import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFurnizor } from '../models/IFurnizor';
import { BACKEND_URL } from '../environments/urlConfig';

@Injectable({
  providedIn: 'root',
})
export class FurnizoriService {
  constructor(private http: HttpClient) {}

  getFurnizori(): Observable<IFurnizor[]> {
    return this.http.get<IFurnizor[]>(
      `${BACKEND_URL}/api/userprofile/getfurnizori`
    );
  }
  updateUserStatus(userId: number, isDisabled: boolean): Observable<any> {
    return this.http.put(
      `${BACKEND_URL}/api/userprofile/${userId}/isDisabled`,
      isDisabled
    );
  }
}
