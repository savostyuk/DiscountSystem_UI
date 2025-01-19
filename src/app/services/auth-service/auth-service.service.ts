import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private router: Router) { }

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

    this.router.navigate(['/login']);
  }

  register(firstName: string, lastName: string, location: string, email: string, password: string): Observable<any> {
    const registerData = {firstName, lastName, location, email, password}
    return this.http.post(`${BASE_API_URL}/auth/register`, registerData);
  }
}
