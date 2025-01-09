import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { IBgImage } from '../../../models/bg-image.interface';
import { IPageTitle } from '../../../models/page-title.interface';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterModule,
    TranslateModule,
    CommonModule,
    HeaderComponent,
    MatTabsModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeLayoutComponent {
  private readonly router = inject(Router);

  route = this.router.url;
  imagePath = "";
  pageTitle = "";

  bgImages: IBgImage[] = [
    { imagePath: 'images/background-image/Desc_laptop.png', pagePath: '/discounts' },
    { imagePath: 'images/background-image/Sales_girl.png', pagePath: '/favorites' },
    { imagePath: 'images/background-image/boy_with_nout.png', pagePath: '/profile' },
    { imagePath: 'images/background-image/Man_with_pc.png', pagePath: '/admin/users' },
  ];

  pageTitles: IPageTitle[] = [
    { localizationKey: 'header.discounts', pagePath: '/discounts' },
    { localizationKey: 'header.favorites', pagePath: '/favorites' },
    { localizationKey: 'header.profile', pagePath: '/profile' },
    { localizationKey: 'header.moderator', pagePath: '/moderator/vendors' },
    { localizationKey: 'header.moderator', pagePath: '/moderator/categories_tags' },
    { localizationKey: 'header.admin', pagePath: '/admin/users' },
  ];

  ngOnInit(): void {
    this.getBackgroundImage();

    this.getLocalizationKey();
  }

  getBackgroundImage(): string {
    this.route = this.router.url;
    const imgOption = this.bgImages.find(item => item.pagePath === this.route);

    return (imgOption) ? `url(${imgOption?.imagePath})` : 'none';
  }

  getLocalizationKey(): string {
    this.route = this.router.url;
    const titleOption = this.pageTitles.find(item => item.pagePath === this.route);

    return (titleOption) ? titleOption?.localizationKey : 'Unknown Page';
  }
}
