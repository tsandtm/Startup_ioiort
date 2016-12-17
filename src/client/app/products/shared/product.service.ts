import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LogService } from '../../shared/log.service';

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http, private logService: LogService) { }

    //Get all data
    getProducts(): Promise<Product[]> {
        return this._http.get('/api/book')
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }

    //get with pagging & search & sort

    //Get by id
    getProduct(id: number): Promise<Product> {
        return this.getProducts()
            .then(products => products.find(p => p.productId === id))
            .catch(this.handleError);
    }

    //delete

    //update & insert



    // --------------------private method
    //Save log event
    private handleError(error: Error): Promise<any> {
        console.error(error);
        this.logService.logError(error, 'web', 'angular 2 app', 'duc');
        return Promise.reject(error.message || error);
    }
    //---------------------end
}
