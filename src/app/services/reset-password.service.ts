import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../environments/urlConfig';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private baseUrl = `${BACKEND_URL}`; // Ajustează la URL-ul tău

  constructor(private http: HttpClient) {}

  resetPassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.baseUrl}/api/userprofile/reset-password/${userId}`;
    return this.http.post(url, { oldPassword, newPassword });
  }
}
