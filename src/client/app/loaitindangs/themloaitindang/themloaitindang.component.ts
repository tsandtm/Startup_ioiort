import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaiTinDang } from '../shared/loaitindang.model';
import { LoaiTinDangService } from '../shared/loaitindang.service';
@Component({
    templateUrl:'/loaitindangs/themloaitindang/themloaitindang.component.html'
})
export class ThemloaitindangComponent implements OnInit {
    loaitindangs: LoaiTinDang[];
    maloaitindang: number;
    tengoi: string;
    bieutuong: string;
    kyhieu: string;
    constructor(private _loaitindangService: LoaiTinDangService, private _router: Router ) {
    }
    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._loaitindangService.getLoaiTinDangs()
            .then(loaitindangs => this.loaitindangs = loaitindangs)
    }

    public themloaitindang(){
        let loaitindang: LoaiTinDang = new LoaiTinDang();

        loaitindang.TenGoi = this.tengoi;
        loaitindang.KyHieu = this.kyhieu;
        loaitindang.BieuTuong = this.bieutuong;
        loaitindang.LoaiTinDangID = this.maloaitindang;

        this._loaitindangService.themLoaiTinDang(loaitindang)
                    .then(result => {
                        if(result){
                            alert('thêm thành công');
                             this._router.navigate(['loaitindangs']);
                          
                        }else{
                            alert('thêm không thành công');
                        }
                    })
                    .catch(error => console.error('Error ', error));
    }
    onBack(): void {
        this._router.navigate(['loaitindangs']);
    }

}