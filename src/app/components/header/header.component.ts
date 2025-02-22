import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HEADER_TABS } from '../../models/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import { SelectBackgroundComponent } from "./select-background/select-background.component";
import { RoleService } from '../../services/role-service/role.service';
import { includes, slice } from 'lodash';
import { ITab } from '../../models/tab.interface';
import { IUser } from '../../models/user.interface';
import { UsersService } from '../../services/users-service/users.service';
import { tap } from 'rxjs/operators';
import { JwtHelper } from '../../helpers/jwt.helper';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,
    TranslateModule,
    LanguageSelectionComponent,
    MatMenuModule,
    MatTabsModule,
    SelectBackgroundComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly roleService = inject(RoleService);
  private readonly userService = inject(UsersService);  
  private readonly authService = inject(AuthService);

  tabs!: ITab[];
  userphoto = 'images/user.png';
  fullName = computed(() => {
    const user = this.userService.user();
    return user ? user.fullName : ''
  });
  location = computed(() => {
    const user = this.userService.user();
    return user ? user.location : ''
  });
  userDetails!: IUser;

  ngOnInit() {
    this.getTabs();
    this.getUserInfo();
  }

  getTabs(): ITab[] {
    const role = this.roleService.getRole();
    switch (true) {
      case (includes(role, 'Admin')):
        return this.tabs = HEADER_TABS;

      case (includes(role, 'Moderator')):
        return this.tabs = slice(HEADER_TABS, 0, 3);

      case (includes(role, 'User')):
      default:
        return this.tabs = slice(HEADER_TABS, 0, 2);
    }
  }

  getUserInfo() {
    this.userService.getUserDetails(JwtHelper.getUserIdFromToken(localStorage.getItem('accessToken')!)).pipe(
      tap((data) => {
        this.userDetails = data;
        this.userService.setUser(data);
      }),
    ).subscribe();
  }

  goToPerson(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }
}
