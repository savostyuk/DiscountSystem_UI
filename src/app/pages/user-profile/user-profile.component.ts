import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { UsersService } from '../../services/users-service/users.service';
import { JwtHelper } from '../../helpers/jwt.helper';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of, tap } from 'rxjs';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-user-profile',
  imports: [TranslateModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent {
  private readonly usersService = inject(UsersService);
  private readonly toaster = inject(ToasterService);
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);
  private readonly translateService = inject(TranslateService);
  user: IUser | undefined;
  userId = '';

  ngOnInit() {
    this.userId = JwtHelper.getUserIdFromToken(localStorage.getItem('accessToken')!);
    this.usersService.getUserDetails(this.userId).pipe(
      tap((data) => {
        this.user = data;
      }),
      catchError(() => of(this.toaster.open('Сan not get User Profile')))
    ).subscribe();
  }

  deleteAccount() {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete-account.message'),
      buttonPositive: this.translateService.instant('confirmation.delete-account.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete-account.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      if(isDelete) {
        this.usersService.deleteUser(this.userId).pipe(
          tap(() => {
            this.toaster.open('User Account was deleted successfully.')
            this.authService.logout();
          }),
          catchError(() => of(this.toaster.open('Сan not delete User Account')))
        ).subscribe();
      }
    });
  }
}
