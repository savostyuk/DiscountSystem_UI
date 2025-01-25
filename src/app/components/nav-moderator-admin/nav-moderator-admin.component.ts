import { Component, ViewEncapsulation, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ITab } from '../../models/tab.interface';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-nav-moderator-admin',
  imports: [TranslateModule, RouterModule, MatTabsModule],
  templateUrl: './nav-moderator-admin.component.html',
  styleUrl: './nav-moderator-admin.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavModeratorAdminComponent {
  readonly tabs = input<Array<ITab>>();
}
