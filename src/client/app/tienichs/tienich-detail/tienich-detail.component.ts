import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TienIch } from '../shared/tienich.model';
import { TienIchService } from '../shared/tienich.service';
//import { StarComponent } from '../../shared/star.component';

@Component({
    templateUrl: '/tienichs/tienich-detail/tienich-detail.component.html'
})
export class TienichDetailComponent implements OnInit {
    pageTitle: string = 'Chi tiết tiện ích';
    @Input() tienich: TienIch;
    errorMessage: string;

    constructor(private _tienichcService: TienIchService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getTintuc(id);
        })
    }

    getTintuc(id: number) {
        this._tienichcService.getTienIch(id)
            .then(tienich => this.tienich = tienich)
    }

    onBack(): void {
        this._router.navigate(['tienichs']);
    }

}
