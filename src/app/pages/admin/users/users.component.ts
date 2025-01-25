import { Component, ViewEncapsulation, inject } from '@angular/core';
import { forEach } from 'lodash';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { GridService } from '../../../services/grid-service/grid.service';
import { IUser } from '../../../models/user.interface';
import { UsersService } from '../../../services/users-service/users.service';
import { UserCardComponent } from "../../../components/user-card/user-card.component";
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCardComponent, MatGridListModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
  private usersService = inject(UsersService);
  private toaster = inject(ToasterService);
  private gridService = inject(GridService);


  users: IUser[] = [];
  breakpoint: number;

  constructor() {
    this.breakpoint = 0;
  }

  ngOnInit(): void {
    this.getUsersList();
    this.breakpoint = this.gridService.getUserGrid(window.innerWidth);
  }

  getUsersList(): void {
    this.usersService.getUsers().subscribe(
      (data) => {
        forEach(data, (user: any) => {
          this.users.push(user);
        });
      },
      () => {
        this.toaster.open('Сan not get users');
      }
    );
  }

  onResize(event: any): void {
    this.breakpoint = this.gridService.getUserGrid(event.target.innerWidth);
  }
}
