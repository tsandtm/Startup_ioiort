import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TinTuc } from '../shared/tintuc.model';
import { TinTucService } from '../shared/tintuc.service';
import { StarComponent } from '../../shared/star.component';

@Component({
    templateUrl: '/tintuc/tintucs-details/tintuc-details.component.html'
})
export class TinTucDetailsComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    @Input() tintuc: TinTuc;
    errorMessage: string;

    constructor(private _tintucService: TinTucService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getTinTuc(id);
        })
    }
    xoa(){
        this._tintucService.xoaTinTuc(this.tintuc.id)
                .then(t => {
                    if(t){
                        return this._router.navigateByUrl('/tintuc')
                    }
                })
                .catch(error => {
                    console.error('Error: ',error);
                });
    }
    getTinTuc(id: number) {
        // this._productService.getProduct(id)
        //     .subscribe(
        //     product => this.product = product,
        //     error => this.errorMessage = <any>error);
        this._tintucService.getTinTuc(id)
        .then(tintuc=>{
            this.tintuc = tintuc;
            console.log(this.tintuc)
        })
 }
    onBack(): void {
        this._router.navigate(['tintuc']);
    }

}
