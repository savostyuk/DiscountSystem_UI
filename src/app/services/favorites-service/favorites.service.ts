import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(public http: HttpClient) {}

  getFavorites(): Observable<any> {
    return this.http.get(`${BASE_API_URL}/favorites`);
  }

  addFavorite(discountId: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/favorites`, { discountId });
  }

  updateFavorite(discountId: string, note: string): Observable<any> {
    return this.http.put(`${BASE_API_URL}/favorites`, { discountId, note });
  }

  deleteFavorite(discountId: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/favorites/${discountId}`);
  }
}
