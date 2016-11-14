import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TinTuc } from '../shared/tintuc.model';
import { TintucService } from '../shared/tintuc.service';
//import { StarComponent } from '../../shared/star.component';

@Component({
    templateUrl: '/tintucs/tintuc-detail/tintuc-detail.component.html'
})
export class TintucDetailComponent implements OnInit {
    pageTitle: string = 'Chi tiết Tin tức';
    @Input() tintuc: TinTuc;
    errorMessage: string;

    constructor(private _tintucService: TintucService,
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
        // this._productService.getProduct(id)
        //     .subscribe(
        //     product => this.product = product,
        //     error => this.errorMessage = <any>error);

        this._tintucService.getTintuc(id)
            .then(tintuc => this.tintuc = tintuc)
    }

    onBack(): void {
        this._router.navigate(['tintucs']);
    }

}
