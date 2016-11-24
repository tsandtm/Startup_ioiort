import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoaiTinDang } from '../shared/loaitindang.model';
import { LoaiTinDangService } from '../shared/loaitindang.service';

@Component({
    templateUrl: '/loaitindangs/sualoaitindang/sualoaitindang.component.html'
})
export class SuaLoaiTinDangComponent implements OnInit {
    pageTitle: string = 'Loai Tin Dang Edit';
    
    @Input() loaitindang: LoaiTinDang;
    errorMessage: string;

    constructor(private _loaitindangService: LoaiTinDangService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getLoaiTinDang(id);
        })
    }

    getLoaiTinDang(id: number) {
             this._loaitindangService.getLoaiTinDang(id)
            .then(loaitindang => {
            console.log(loaitindang);
            this.loaitindang = loaitindang;
            })
            
    }
       public sualoaitindang(){
                 let loaitindang: LoaiTinDang = new LoaiTinDang();
                 loaitindang.id= this.loaitindang.id;
                 loaitindang.BieuTuong = this.loaitindang.BieuTuong;
                 loaitindang.TenGoi = this.loaitindang.TenGoi;
                 loaitindang.KyHieu = this.loaitindang.KyHieu;

                 this._loaitindangService.suaLoaiTinDang(loaitindang)
                    .then(result => {
                        if(result){
                            alert('sua thanh cong')
                            this._router.navigate(['loaitindangs'])
                        }else{
                            alert('sua error')
                        }
                    })
            }


    onBack(): void {
        this._router.navigate(['loaitindangs']);
    }

}
