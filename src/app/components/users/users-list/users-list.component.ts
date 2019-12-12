import { UsersService } from './../../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(
    private usersService: UsersService
  ) {
    this.users = [];
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(
      response => {
        this.users = response;
      },
      err => {
        alert('Ojo ahí!');
      }
    );
  }

}
