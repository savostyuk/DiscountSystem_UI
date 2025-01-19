import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { catchError, of, tap } from 'rxjs';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(ToasterService);
  firstName: string = '';
  lastName: string = '';
  location: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  register(): void {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.firstName, this.lastName, this.location, this.email, this.password).pipe(
        tap((data) => {
          if (data.message) {
            this.toaster.open(data.message);
          }

          this.goToLogin();
        }),
        catchError(error => {
          let errorMessage = '';
          const duplicateEmailError = error.error?.find((e: { code: string; description: string }) => e.code === "DuplicateEmail");
          duplicateEmailError 
            ? errorMessage += `${duplicateEmailError.description}`
            : errorMessage = 'An error occured during registration. Please try again  later.';

          this.toaster.open(errorMessage);
          return of();
        })
      ).subscribe();
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
