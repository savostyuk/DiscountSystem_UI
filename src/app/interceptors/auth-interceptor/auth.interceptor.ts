import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return authService.refreshToken().pipe(
          switchMap((response: { token: string; refreshToken: string }) => {
            localStorage.setItem('accessToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);

            const clonedRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${response.token}`),
            });

            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(['/login']);
            
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );;
};
