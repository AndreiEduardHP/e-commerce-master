import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../environments/urlConfig';
import { ICompany } from '../models/ICompany';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${BACKEND_URL}/api/company`; // Înlocuiește cu URL-ul tău

  constructor(private http: HttpClient) {}

  createCompany(company: ICompany): Observable<any> {
    return this.http.post(this.apiUrl, company);
  }
}
