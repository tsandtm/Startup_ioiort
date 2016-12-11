import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginService } from "../Shared/testthu";
// login
import { LoginService } from '../../login/Shared/login.service';



@Component({
    templateUrl: '/menu/menu-list/menu-list.component.html',
    styleUrls: ['menu/menu-list/menu-list.component.css'],
    providers: [LoginService]
})
export class MenuListComponent implements OnInit {
    pageTitle: string = 'Menu List';

    constructor(private loginService: LoginService, private _router: Router) {
    }

    ngOnInit() {
        this.loginService.GetSession()
            .then((response) => {
                let AccountID = response._body;
                return AccountID;
            })
            .then((response) => {
                if (response == "error") {
                    return this._router.navigate(["login"]);
                }
                else{
                    //Giá trị reponse ở mục block này là AccountID
                }
            })
    }
}