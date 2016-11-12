import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../shared/user.model';
import { UsersService } from '../shared/user.service';

@Component({
    templateUrl: '/users/user-detail/user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    pageTitle: string = 'User Detail';
    user: User;
    errorMessage: string;

    constructor(private _UserService: UsersService,
        private _router: Router,
        private _route: ActivatedRoute) {
            console.log(this._route.snapshot.params['id']);
    }

    ngOnInit() {
        // this._route.params.forEach((params: Params) => {
        //     console.log(params["id"])
        //     let id = + params["id"];
        //     this.getUser(id);
        // })
    }

    getUser(id: number) {
        // this._UserService.getUser(id)
        //     .subscribe(
        //     user => this.user = user,
        //     error => this.errorMessage = <any>error);
        console.log(id);
        this._UserService.getUser(id)
            .then(user => this.user = user)
    }

    onBack(): void {
        this._router.navigate(['users']);
    }

}
