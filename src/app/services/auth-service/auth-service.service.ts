import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(login: string, password: string): Observable<{ token: string; refreshToken: string }> {
    const loginData = {email: login, password};

    return this.http.post<{ token: string; refreshToken: string }>(`${BASE_API_URL}/auth/login`, loginData);
  }

  refreshToken(): Observable<{ token: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    return this.http.post<{ token: string; refreshToken: string }>(`${BASE_API_URL}/auth/refresh-token`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const registerData = {firstName, lastName, email, password}
    return this.http.post(`${BASE_API_URL}/auth/register`, registerData);
  }
}
