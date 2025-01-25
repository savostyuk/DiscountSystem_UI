import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';
import { Router } from '@angular/router';
import { UsersService } from '../users-service/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UsersService);

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
    this.userService.clearUser();

    this.router.navigate(['/login']);
  }

  register(firstName: string, lastName: string, location: string, email: string, password: string): Observable<any> {
    const registerData = {firstName, lastName, location, email, password}
    return this.http.post(`${BASE_API_URL}/auth/register`, registerData);
  }
}
