import { Component } from '@angular/core';
import { ADMIN_TABS } from '../../models/tabs';
import { RouterModule } from '@angular/router';
import { NavModeratorAdminComponent } from "../../components/nav-moderator-admin/nav-moderator-admin.component";

@Component({
  selector: 'app-admin',
  imports: [RouterModule, NavModeratorAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  tabsAdmin = ADMIN_TABS;
}
