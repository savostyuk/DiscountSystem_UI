import { Component, inject, ViewEncapsulation } from '@angular/core';
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

  tabs!: ITab[];
  userphoto = 'images/user.png';

  ngOnInit() {
    this.getTabs();
  }

  getTabs(): ITab[] {
    const role = this.roleService.getRole();
    console.log(role);
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

  goToPerson(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.router.navigate(['/login']);
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }
}
