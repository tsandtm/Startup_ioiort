import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TienIch } from '../shared/tienich.model';
import { TienIchService } from '../shared/tienich.service';

@Component({
    templateUrl: '/tienichs/suatienich/suatienich.component.html'
})
export class SuatienichComponent implements OnInit {
    pageTitle: string = 'Tien ICH Edit';
    
    @Input() tienich: TienIch;
    errorMessage: string;

    constructor(private _tienichService: TienIchService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getTienIch(id);
        })
    }

    getTienIch(id: number) {
             this._tienichService.getTienIch(id)
            .then(tienich => {
            console.log(tienich);
            this.tienich = tienich;
            })
            
    }
       public suatienich(){
                 let tienich: TienIch = new TienIch();
                 tienich.id= this.tienich.id;
                 tienich.BieuTuong = this.tienich.BieuTuong;
                 tienich.TenGoi = this.tienich.TenGoi;
                 tienich.KyHieu = this.tienich.KyHieu;

                 this._tienichService.suaTienIch(tienich)
                    .then(result => {
                        if(result){
                            alert('sua thanh cong')
                            this._router.navigate(['tienichs'])
                        }else{
                            alert('sua error')
                        }
                    })
            }


    onBack(): void {
        this._router.navigate(['tienichs']);
    }

}
