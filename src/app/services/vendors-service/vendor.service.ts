import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private readonly http: HttpClient) { }

  getVendors(): Observable<any> {
    return this.http.get(`${BASE_API_URL}/vendors`);
  }

  getVendorDetails(vendorId: string): Observable<any> {
    return this.http.get(`${BASE_API_URL}/vendors/${vendorId}`);
  }

  addVendor(newVendor: any): Observable<any> {
    return this.http.post(`${BASE_API_URL}/vendors`, newVendor);
  }

  updateVendor(updatedVendor: any): Observable<any> {
    return this.http.put(`${BASE_API_URL}/vendors/${updatedVendor.id}`, updatedVendor);
  }
 
  deleteVendor(id: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/vendors/${id}`);
  }
}
