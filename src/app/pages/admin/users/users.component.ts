import { Component, ViewEncapsulation } from '@angular/core';
import { forEach } from 'lodash';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { GridService } from '../../../services/grid-service/grid.service';
import { IUser } from '../../../models/user.interface';
import { UsersService } from '../../../services/users-service/users.service';
import { UserCardComponent } from "../../../components/user-card/user-card.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCardComponent, MatGridListModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {

  users: IUser[] = [];
  searchData: any = {};
  topUsers: any;
  skipUsers: any;
  previousScrollPosition: any;
  totalCount: any;
  breakpoint: number;

  constructor(private usersService: UsersService,
    private toaster: ToasterService,
    private gridService: GridService) {
    this.topUsers = 9;
    this.skipUsers = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.breakpoint = 0;
  }

  ngOnInit(): void {
    if (history.state.userEmail) {
      this.searchData.searchUserText = history.state.userEmail;
    }
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
