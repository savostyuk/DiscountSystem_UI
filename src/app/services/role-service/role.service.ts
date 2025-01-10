import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isString } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role: string = '';
  decoded: any;

  getRole(): any {
    const token = localStorage.getItem('accessToken');

    if (isString(token)) {
      this.decoded = jwtDecode(token);
      this.role = this.decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      return this.role;
    }
  }
}
