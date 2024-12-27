import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HEADER_TABS } from '../../models/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, 
    TranslateModule, 
    LanguageSelectionComponent, 
    MatMenuModule, 
    MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  private readonly router = inject(Router);

  tabs = HEADER_TABS;
  userphoto = 'images/user.jpg';

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
