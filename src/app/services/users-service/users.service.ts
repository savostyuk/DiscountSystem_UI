import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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
