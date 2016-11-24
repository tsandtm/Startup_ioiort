import { Component, OnInit } from '@angular/core';
import { LoaiTinDang } from '../shared/loaitindang.model';
import { LoaiTinDangService } from '../shared/loaitindang.service';
import { Router } from '@angular/router';
import { LoaiTinDangFilterPipe } from '../loaitindang-filter/loaitindang-filter.pipe';
@Component({
    templateUrl: '/loaitindangs/loaitindang-list/loaitindang-list.component.html',
    styleUrls: ['/loaitindangs/loaitindang-list/loaitindang-list.component.css']
})
export class LoaiTinDangListComponent implements OnInit {
    pageTitle: string = 'Danh sách Loại Tin Đăng';
    imageWidth: number = 50;
    loaitindangs: LoaiTinDang[];
    listFilter: string = '';
    constructor(private _loaitindangService: LoaiTinDangService, private _router: Router) {
    }
    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._loaitindangService.getLoaiTinDangs()
            .then(loaitindangs => this.loaitindangs = loaitindangs)
    }
    btnXoa(id:number,index){
         if(confirm("Ban muon xoa khong=" + id + "?"))
        this._loaitindangService.xoaLoaiTinDang(id)
        .then(t => {
            if(t) {
                    console.log("Đã Xóa");
                    this.loaitindangs.splice(index,1);
                    this._router.navigate(['loaitindangs']);
            }
        })
        .catch(errorMessage => {
            console.error(errorMessage.message)
        });
    }
}
