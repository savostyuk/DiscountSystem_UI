import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  http = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getFavorites(): Observable<any> {
    return this.http.get(`${BASE_API_URL}/favorites`);
  }

  addFavorite(discountId: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/favorites`, { discountId });
  }

  updateFavorite(discountId: string, note: string): Observable<any> {
    return this.http.put(`${BASE_API_URL}/favorites/${discountId}`, { discountId, note });
  }

  deleteFavorite(discountId: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/favorites/${discountId}`);
  }
}
