import { Component, ViewEncapsulation, inject, input } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-user-card',
  imports: [MatButtonToggleModule, FormsModule, TranslateModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserCardComponent {
  private usersService = inject(UsersService);
  private toaster = inject(ToasterService);

  readonly user = input<IUser>();

  role: string | undefined  = '';

  ngOnInit(): void {
    this.role = this.user()?.role;
  }

  changeUserRole(value: string): void {
    this.usersService.changeRole(this.user()!.id, value).subscribe(
      () => {
        this.toaster.open('User role was changed', 'success');
      },
      () => {
        this.toaster.open('Can not change role');
      });
  }
}
