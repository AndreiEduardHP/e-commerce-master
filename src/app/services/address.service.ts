import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../environments/urlConfig';
import { Observable } from 'rxjs';
import { IAddress } from '../models/IAddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = `${BACKEND_URL}/api/Addresses`;

  constructor(private http: HttpClient) {}

  loadAddresses(userId: number | undefined): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${this.apiUrl}/user/${userId}`);
  }

  editAddress(address: IAddress): Observable<any> {
    return this.http.put<IAddress>(`${this.apiUrl}/${address.id}`, address);
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${addressId}`);
  }
  addAddress(addressData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, addressData);
  }
}
