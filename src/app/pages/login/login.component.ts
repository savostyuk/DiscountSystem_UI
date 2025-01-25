import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(ToasterService);
  private readonly router = inject(Router);

  hide = true;
  email = '';
  password = '';

  login(): void {
    this.authService.login(this.email, this.password).pipe(
      tap((data) => {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        this.router.navigate(['/discounts']);
      }),
      catchError(() => of(this.toaster.open('The username and password you entered did not match our records. Please double-check and try again.')))
    ).subscribe();
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
