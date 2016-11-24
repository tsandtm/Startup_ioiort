import { Component, OnInit } from '@angular/core';
import { TienIch } from '../shared/tienich.model';
import { TienIchService } from '../shared/tienich.service';
import { Router } from '@angular/router';
import { TienIchFilterPipe } from '../tienich-filter/tienich-filter.pipe';
@Component({
    templateUrl: '/tienichs/tienich-list/tienich-list.component.html',
    styleUrls: ['/tienichs/tienich-list/tienich-list.component.css']
})
export class TienIchtListComponent implements OnInit {
    pageTitle: string = 'Danh sách';
    imageWidth: number = 50;
    tienichs: TienIch[];
    listFilter: string = '';

    constructor(private _tienichService: TienIchService, private _router: Router) {
    }

    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._tienichService.getTienIchs()
            .then(tienichs => this.tienichs = tienichs)
    }
    btnXoa(id:number,index){
        if(confirm("Ban muon xoa khong=" + id + "?"))
        this._tienichService.xoaTienIch(id)
        .then(t => {
            if(t) {
                    console.log("Đã Xóa");
                    this.tienichs.splice(index,1);
                    this._router.navigate(['tienichs']);
            }
        })
        .catch(errorMessage => {
            console.error(errorMessage.message)
        });
    }
}
