import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  login(login: string, password: string): Observable<{ token: string; refreshToken: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const loginData = {email: login, password};

    return this.http.post<{ token: string; refreshToken: string }>(`${BASE_API_URL}/auth/login`, loginData, {headers});
  }

  refreshToken(): Observable<{ token: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    return this.http.post<{ token: string; refreshToken: string }>(`${BASE_API_URL}/auth/refresh-token`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
