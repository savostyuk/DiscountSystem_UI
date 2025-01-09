import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})

export class DiscountsService {
  constructor(public http: HttpClient) {}

  getDiscounts(): any {
    return this.http.get(`${BASE_API_URL}/Discounts`);
  }

  getDiscountDetails(id: string): Observable<any> {
    return this.http.get(`${BASE_API_URL}/discounts/${id}`);
  }

  addDiscount(newDiscount: any): Observable<any> {
    return this.http.post(`${BASE_API_URL}/discounts`, newDiscount);
  }

  deleteDiscount(id: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/discounts/${id}`);
  }

  updateDiscount(updatedDiscount: any): Observable<any> {
    return this.http.put(`${BASE_API_URL}/discounts/${updatedDiscount.id}`, updatedDiscount);
  }

}
