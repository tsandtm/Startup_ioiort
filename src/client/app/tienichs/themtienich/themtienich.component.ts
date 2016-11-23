import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Response} from '@angular/http';
import { TienIch } from '../shared/tienich.model';
import { TienIchService } from '../shared/tienich.service';
@Component({
    templateUrl: '/tienichs/themtienich/themtienich.component.html'
})
export class ThemtienichComponent implements OnInit {
    tienichs: TienIch[];
    matienich: number;
    tengoi: string;
    bieutuong: string;
    kyhieu: string;
    private actionUrl: string;
    constructor(private _tienichService: TienIchService, private _router: Router ) {
    }
    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._tienichService.getTienIchs()
            .then(tienichs => this.tienichs = tienichs)
    }

    public themtienich(){
        let tienich: TienIch = new TienIch();

        tienich.TenGoi = this.tengoi;
        tienich.KyHieu = this.kyhieu;
        tienich.BieuTuong = this.bieutuong;
        tienich.TienIchID = this.matienich;

        this._tienichService.themTienIch(tienich)
                    .then(result => {
                        if(result){
                            alert('thêm thành công');
                        }else{
                            alert('thêm không thành công');
                        }
                    })
                    .catch(error => console.error('Error ', error));
    }

    onBack(): void {
        this._router.navigate(['tienichs']);
    }

}