import { Component, OnInit }  from '@angular/core';


import { TinTuc } from '../shared/tintuc.model';
import {TintuctFilterPipe} from '../tintuc-filter/tintuc-filter.pipe'
// import { ProductFilterPipe } from '../product-filter/product-filter.pipe';
// import { StarComponent } from '../../shared/star.component';
import { TintucService } from '../shared/tintuc.service';

@Component({
    templateUrl: '/tintucs/tintuc-list/tintuc-list.component.html',
    styleUrls: ['/tintucs/tintuc-list/tintuc-list.component.css']
})
export class TinTuctListComponent implements OnInit {
    pageTitle: string = 'Danh sách';
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string = '';
    tintucs: TinTuc[];

    constructor(private _tintucService: TintucService) {
    }

    ngOnInit(): void {
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._tintucService.getTinTucs()
                .then(tintucs => this.tintucs = tintucs)
    }

    // onRatingClicked(message: string): void {
    //     this.pageTitle = 'Product List: ' + message;
    // }
}
