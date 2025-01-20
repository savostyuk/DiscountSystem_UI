import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BASE_API_URL } from '../../global';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly currentUser = signal<IUser | null>(null);

  get user() {
    return this.currentUser.asReadonly();
  }

  setUser(user: IUser): void {
    this.currentUser.set(user);
  }

  clearUser(): void {
    this.currentUser.set(null);
  }

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${BASE_API_URL}/users`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${BASE_API_URL}/users/${userId}`);
  }

  updateUser(updatedUser: any): Observable<any> {
    return this.http.put(`${BASE_API_URL}/users/${updatedUser.id}`, updatedUser);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/users/${id}`);
  }

  changeRole(id: string, newRole: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/users/update-role`, { id, newRole });
  }
}
