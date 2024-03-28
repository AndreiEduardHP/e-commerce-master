import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoggedUser } from '../models/ILoggedUser';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../environments/urlConfig';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(userId: number | undefined): Observable<ILoggedUser[]> {
    return this.http.get<ILoggedUser[]>(
      `${BACKEND_URL}/api/userprofile/${userId}`
    );
  }
}
