import { Component, OnInit }  from '@angular/core';

import {Overlay, overlayConfigFactory} from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {ProduceDetailModal,ProduceDetailModalContext} from '../product-detail-modal/product-detail-modal.component';


import { Product } from '../shared/product.model';
import { ProductFilterPipe } from '../product-filter/product-filter.pipe';
import { StarComponent } from '../../shared/components/star.component';
import { ProductService } from '../shared/product.service';

@Component({
    templateUrl: '/products/product-list/product-list.component.html',
    styleUrls: ['/products/product-list/product-list.component.css'],
    providers: [Modal]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = '';
    errorMessage: string;
    products: Promise<Product[]>;
    checked: any[] = [];
    isRequest: boolean = false;


    constructor(
        private _productService: ProductService,
        private modal: Modal) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.isRequest = true;
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this.products = this._productService.getProducts()
                .then(products => {
                    this.isRequest = false;
                    return products;
                });

        // setTimeout(() => {
        //     this.isRequest = false;
        // },3000)
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    showProductDetailModal(product: Product){
        this.modal.open(ProduceDetailModal,overlayConfigFactory({product},BSModalContext))
    }

    onCheck(product: Product){
        this.checked.push[product.productId];
        product.isCheked =true;
    }

    isChecked(product: Product): boolean{
        return this.checked.some(id => id === product.productId);
    }
}
