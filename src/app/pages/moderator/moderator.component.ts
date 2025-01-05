import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavModeratorAdminComponent } from "../../components/nav-moderator-admin/nav-moderator-admin.component";
import { MODERATOR_TABS } from '../../models/tabs';

@Component({
  selector: 'app-moderator',
  imports: [RouterModule, NavModeratorAdminComponent],
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.scss'
})
export class ModeratorComponent {
  tabsModerator = MODERATOR_TABS;
}
