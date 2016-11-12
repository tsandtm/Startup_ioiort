import { Component } from '@angular/core';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/user.service';

@Component({
    selector: 'pm-users',
    templateUrl:'/users/user-list/user-list.component.html'
})
export class UserListComponent {
    pageTitle: string = 'User List';
    
    users: User[];
     
    constructor(private _UserService: UsersService) {

    }

    ngOnInit(): void {
        this._UserService.getAllUsers()
                .then(users => this.users = users)
    }
    
}