import { Component } from '@angular/core';
import { LoginService } from './Shared/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: '/login/login.component.html',
})
export class LoginComponent {
    UserName: string = "";
    Password: string = "";

    constructor(private loginService: LoginService, private _router: Router) {
    }

    submitLogin() {
        console.log("username: " + this.UserName + "  -  " + this.Password);
        this.loginService.login(this.UserName, this.Password)
            .then((result) => {
                this._router.navigate(["menu-list"]);
            })  
            .catch((err) => {
                console.log(err);
            })
    }
} 