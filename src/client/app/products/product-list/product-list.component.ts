import { Component, OnInit }  from '@angular/core';


import { Product } from '../shared/product.model';
import { ProductFilterPipe } from '../product-filter/product-filter.pipe';
import { StarComponent } from '../../shared/star.component';
import { ProductService } from '../shared/product.service';

@Component({
    templateUrl: '/products/product-list/product-list.component.html',
    styleUrls: ['/products/product-list/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = '';
    errorMessage: string;
    products: Product[];

    constructor(private _productService: ProductService) {

    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
   // ProductService d = new ProductService();
        //    this._productService.getProducts()
        //              .subscribe(
        //                products => this.products = products,
        //                error =>  this.errorMessage = <any>error);
        this._productService.getProducts()
                .then(products => this.products = products)
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
