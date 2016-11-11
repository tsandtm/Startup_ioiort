import { Component,OnInit,Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Appkey } from './shared/app.model';
import { Notifi } from './shared/notifi.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
@Component({
    templateUrl: '/notification-send/confirm.component.html',
    providers: [AppService,NotifiService]
})
export class ConfirmComponent implements OnInit {
    @Input() notifi:Notifi;
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
    private _router: Router,
    private _route: ActivatedRoute) {

    }
    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getNotifi(id);
        })
    }

    getNotifi(id: number) {
        this.notifiservice.getOne(id)
            .then(notifi => this.notifi = notifi)
    }
    SaveAsDraft(): void {
        this._router.navigate(['welcome']);
    }
}
