import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TienIch } from '../shared/tienich.model';
import { TienIchService } from '../shared/tienich.service';
import {TienichFilterPipe} from '../tienich-filter/tienich-filter.pipe';
@Component({
    templateUrl: '/tienichs/tienich-list/tienich-list.component.html',
    styleUrls: ['/tienichs/tienich-list/tienich-list.component.css']
})
export class TienIchtListComponent implements OnInit {
    pageTitle: string = 'Danh sách';
    imageWidth: number = 50;
    listFilter: string = '';
    tienichs: TienIch[];

    constructor(private _tienichService: TienIchService,private _router: Router) {
    }
    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._tienichService.getTienIchs()
            .then(tienichs => this.tienichs = tienichs)
    }
     btnXoa(id: number, index) {
        this._tienichService.xoaTienIch(id)
            .then(t => {
                if (t) {
                    alert('Đã xóa thành công!');
                    this._router.navigate(['tienichs']);
                    this.tienichs.splice(index, 1);
                }
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
    }
}
