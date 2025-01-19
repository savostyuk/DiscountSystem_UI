import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { ModalService } from '../../../services/modal-service/modal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users-service/users.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-user-modal',
  imports: [TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditUserModalComponent {
  firstName = '';
  lastName = '';
  location = '';

  constructor(private toaster: ToasterService,
    private matDialogRef: MatDialogRef<any>,
    private modalService: ModalService,
    private translateService: TranslateService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.firstName = data.user.fullName.split(' ')[0];
    this.lastName = data.user.fullName.split(' ')[1];
    this.location = data.user.location;
  }

  ngOninit() {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
  }

  isChanged(): boolean {
    return this.data.user.fullName.split(' ')[0] !== this.firstName
    || this.data.user.fullName.split(' ')[1] !== this.lastName
    || this.data.user.location !== this.location;
  }

  checkChanges(): void {
    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (this.isChanged()) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  updateUser() {
    let updatedUser: any = {
      id: this.data.user.id,
      firstName: this.firstName,
      lastName: this.lastName,
      location: this.location
    }
    this.usersService.updateUser(updatedUser).pipe(
      tap(() => {
        this.toaster.open('Information has been updated', 'success');
        this.matDialogRef.close(updatedUser);
      }),
      catchError(() => of(this.toaster.open('Information hasn\'t been updated')))
    ).subscribe();
  }
}
