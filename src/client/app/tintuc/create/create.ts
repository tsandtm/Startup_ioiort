import {Component} from '@angular/core';
import {Router} from '@angular/router';
@Component({
    templateUrl:'/tintuc/create/create.html'
})
export class Create{
 constructor(private _router: Router) {
    }
    onBack(): void {
        this._router.navigate(['tintuc']);
    }
}
