import { Component, OnInit }  from '@angular/core';


import { TienIch } from '../shared/tienich.model';
//import {TintuctFilterPipe} from '../tintuc-filter/tintuc-filter.pipe'
// import { ProductFilterPipe } from '../product-filter/product-filter.pipe';
// import { StarComponent } from '../../shared/star.component';
import { TienIchService } from '../shared/tienich.service';


@Component({
    templateUrl: '/tienichs/tienich-list/tienich-list.component.html',
    styleUrls: ['/tienichs/tienich-list/tienich-list.component.css']
})
export class TienIchtListComponent implements OnInit {
    pageTitle: string = 'Danh sách';
    imageWidth: number = 50;    
    tienichs: TienIch[];

    constructor(private _tienichService: TienIchService) {
    }
    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._tienichService.getTienIchs()
                .then(tienichs => this.tienichs = tienichs)
    }

    // onRatingClicked(message: string): void {
    //     this.pageTitle = 'Product List: ' + message;
    // }
}
